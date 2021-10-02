---
title: 《the linux programming interface》练习
date: 2021-09-28 15:58:01
tags: ["随笔"]
index_img: ../assets/tlpi/the-linux-programming-interface.png
---

[《the linux programming interface》](https://man7.org/tlpi/index.html)

# 习题

## 第三章

### 3-1

magic number 隐藏着 Torvalds 和他女儿们的生日

https://github.com/torvalds/linux/blob/5bfc75d92efd494db37f5c4c173d3639d4772966/include/uapi/linux/reboot.h

https://www.nndb.com/people/444/000022378/

```c
#include <linux/reboot.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/syscall.h>
#include <unistd.h>

int main() {
  int code = syscall(SYS_reboot, LINUX_REBOOT_MAGIC1, LINUX_REBOOT_MAGIC2,
                     LINUX_REBOOT_CMD_RESTART);
  if (code == -1) {
    perror("reboot");
    exit(EXIT_FAILURE);
  }
  exit(EXIT_SUCCESS);
}
```

## 第四章

### 4-1

```c
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUFFER_SIZE 1024

int main(int argc, char *argv[]) {
  // check argc
  if (argc < 2) {
    fprintf(stderr, "usage: %s [-a] <file>\n", argv[0]);
    exit(EXIT_FAILURE);
  }

  // parse argv
  int flag_append = -1, opt = -1;
  while ((opt = getopt(argc, argv, "a")) != -1) {
    switch (opt) {
    case 'a':
      flag_append = 1;
      break;
    }
  }

  // open destination file
  int flag = O_WRONLY | (flag_append == -1 ? O_TRUNC : O_APPEND);
  int fd = open(argv[argc - 1], flag, 0644);
  if (fd == -1) {
    perror("open dest file");
    exit(EXIT_FAILURE);
  }

  // write file
  char *buf = malloc(BUFFER_SIZE);
  int n = BUFFER_SIZE;
  do {
    n = read(STDIN_FILENO, buf, n);
    write(fd, buf, n);
  } while (n);
  free(buf);
  exit(EXIT_SUCCESS);
}
```

#### 4-2

```c
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#define BUFFER_SIZE 1014

int main(int argc, char *argv[]) {
  // check args
  if (argc != 3) {
    fprintf(stderr, "usage %s <src> <dest>", argv[0]);
    exit(EXIT_FAILURE);
  }

  // open {src,dest}
  int fd_src, fd_dest;
  if ((fd_src = open(argv[1], O_RDONLY)) == -1) {
    perror("open src");
    exit(EXIT_FAILURE);
  }
  if ((fd_dest = open(argv[2], O_WRONLY | O_CREAT, 0644)) == -1) {
    perror("open dest");
    exit(EXIT_FAILURE);
  }

  // copy
  char *buf = malloc(BUFFER_SIZE);
  int ino_r, ino_w;
  do {
    ino_r = read(fd_src, buf, BUFFER_SIZE);
    if (ino_r == -1) {
      perror("read src");
      exit(EXIT_FAILURE);
    }
    ino_w = write(fd_dest, buf, ino_r);
    if (ino_w == -1) {
      perror("write dest");
      exit(EXIT_FAILURE);
    }
  } while (ino_r);
  close(fd_src);
  close(fd_dest);
  exit(EXIT_SUCCESS);
}
```

## 第五章

### 5-1

```shell
gcc large-file.c -o large-file -ltlpi \
&& ./target-file 1.txt 10111222333
```

能够成功创建包含文件空洞的大文件，大文件逻辑上为 10GB 左右，但是只占据磁盘空间 4KB。文件空洞使用\0 填充，本身不占据物理空间，当实际有写入时才分配磁盘块。

```c
#define _LARGEFILE64_SOURCE
#include <fcntl.h>
#include <sys/stat.h>
#include <tlpi_hdr.h>

int main(int argc, char *argv[]) {
  int fd;
  off64_t off;
  if (argc != 3 || strcmp(argv[1], "--help") == 0)
    usageErr("%s pathname offset\n", argv[0]);
  fd = open64(argv[1], O_RDWR | O_CREAT, S_IRUSR | S_IWUSR);
  if (fd == -1)
    errExit("open64");
  off = atoll(argv[2]);
  if (lseek(fd, off, SEEK_SET) == -1)
    errExit("lseek64");
  if (write(fd, "test", 4) == -1)
    errExit("write");

  exit(EXIT_SUCCESS);
}
```

### 5-2

使用`O_APPEND`打开文件后，write 前使用 lseek 改变偏移量不能使下次写入位置改变。因为每次的写入都是一个原子操作，会先改变偏移量至文件尾再写入。这样做是为了避免并发共享 fd 时的竞态问题。

> ```
> O_APPEND
>       The file is opened in append mode.  Before each write(2),
>       the file offset is positioned at the end of the file, as
>       if with lseek(2).  The modification of the file offset and
>       the write operation are performed as a single atomic step.
>
>       O_APPEND may lead to corrupted files on NFS filesystems if
>       more than one process appends data to a file at once.
>       This is because NFS does not support appending to a file,
>       so the client kernel has to simulate it, which can't be
>       done without a race condition.
> ```

```c
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <tlpi_hdr.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  char *text1 = "hello\nhello1\nhello2\n";
  char *text2 = "abc";
  char *filename = "1.txt";
  int ino, fd;

  fd = open(filename, O_WRONLY | O_CREAT | O_TRUNC, 0644);
  if (fd == -1) {
    errExit("open0");
  }
  ino = write(fd, text1, strlen(text1));
  close(fd);
  fd = open(filename, O_WRONLY | O_APPEND, 0644);
  if (fd == -1) {
    errExit("open1");
  }
  ino = lseek(fd, 0, SEEK_SET);
  if (ino == -1) {
    errExit("lseek");
  }
  write(fd, text2, strlen(text2));
  close(fd);
  exit(EXIT_SUCCESS);
}
```

### 5-3

```shell
# generate f1
./atomic_append f1 1000000 & ./atomic_append f1 1000000
# generate f2
./atomic_append f1 1000000 x & ./atomic_append f1 1000000 x
```

![5-3-1](../assets/tlpi/5-3-1.png)

不使用`O_APPEND`会发生竞态问题。t4 时 process1 的 fd 的偏移量并不是文件尾，而是最后一个字节，因此没有成为在文件尾添加一个字节。

| time slice | process1              | process2              |
| ---------- | --------------------- | --------------------- |
| t1         | lseek(fd,0,SEEK_END); |                       |
| t2         |                       | lseek(fd,0,SEEK_END); |
| t3         |                       | write(fd,"a",1);      |
| t4         | write(fd,"a",1);      |                       |

```c
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <tlpi_hdr.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (argc < 3) {
    usageErr("%s filename num-bytes [x]", argv[0]);
  }
  int fd, ino, num_bytes, open_flag;
  num_bytes = atoll(argv[2]);
  open_flag = O_WRONLY | O_CREAT;
  if (!(argc > 3 && strcmp(argv[3], "x") == 0)) {
    open_flag |= O_APPEND;
  }
  fd = open(argv[1], open_flag, 0644);
  if (fd == -1) {
    errExit("open");
  }
  while ((num_bytes--) > 0) {
    ino = lseek(fd, 0, SEEK_END);
    if (ino == -1) {
      errExit("lseek");
    }
    ino = write(fd, "a", 1);
    if (ino == -1) {
      errExit("write");
    }
  }
  close(fd);
}
```

### 5-4

```c
#include <assert.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <tlpi_hdr.h>
#include <unistd.h>

int tlpi_dup(int oldfd) { return fcntl(oldfd, F_DUPFD); }

int tlpi_dup2(int oldfd, int newfd) {
  int ino;
  if (oldfd == newfd) {
    ino = fcntl(oldfd, F_GETFL);
    if (ino == -1) {
      errno = EBADF;
      return -1;
    }
    return oldfd;
  }
  close(newfd);
  newfd = fcntl(oldfd, F_DUPFD, newfd);
  return newfd;
};

int main() {
  int fd, fd2, ino;
  char *text = "hello123\n";

  // validate tlpi_dup
  fd = open("1.txt", O_RDWR | O_CREAT | O_TRUNC, 0644);
  fd2 = tlpi_dup(fd);
  write(fd2, text, strlen(text));
  close(fd);

  char *buf1 = malloc(strlen(text) + 1);
  fd = open("1.txt", O_RDONLY);
  read(fd, buf1, strlen(text) + 1);
  assert(strcmp(buf1, text) == 0);
  close(fd);

  // validate tlpi_dup2
  fd = open("2.txt", O_RDWR | O_CREAT | O_TRUNC, 0644);
  tlpi_dup2(fd, STDOUT_FILENO);
  write(STDOUT_FILENO, text, strlen(text));
  close(fd);
  char *buf2 = malloc(strlen(text) + 1);
  fd = open("2.txt", O_RDONLY);
  read(fd, buf2, strlen(text) + 1);
  assert(strcmp(buf2, text) == 0);
  close(fd);

  exit(EXIT_SUCCESS);
}
```

### 5-5

```c
#include <assert.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <tlpi_hdr.h>
#include <unistd.h>

int tlpi_dup(int oldfd) { return fcntl(oldfd, F_DUPFD); }

int tlpi_dup2(int oldfd, int newfd) {
  int ino;
  if (oldfd == newfd) {
    ino = fcntl(oldfd, F_GETFL);
    if (ino == -1) {
      errno = EBADF;
      return -1;
    }
    return oldfd;
  }
  close(newfd);
  newfd = fcntl(oldfd, F_DUPFD, newfd);
  return newfd;
};

int main() {
  int fd, fd2, offset1, offset2, file_flag1, file_flag2;
  char *text = "hello world\n";
  fd = open("1.txt", O_RDWR | O_CREAT | O_TRUNC, 0644);
  write(fd, text, strlen(text));
  offset1 = lseek(fd, 3, SEEK_SET);
  file_flag1 = fcntl(fd, F_GETFL);
  fd2 = tlpi_dup(fd);
  offset2 = lseek(fd2, 0, SEEK_CUR);
  file_flag2 = fcntl(fd2, F_GETFL);
  // validate offset
  assert(offset1 == offset2);
  // validate file flag
  assert(file_flag1 == file_flag2);
  close(fd);
  close(fd2);
  exit(EXIT_SUCCESS);
}
```

### 5-6

```c
#include <assert.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

char *file = "1.txt";
char buffer[20];

void assert_file(char *content) {
  int fd = open(file, O_RDONLY);
  read(fd, buffer, 20);
  close(fd);
  assert(strcmp(buffer, content) == 0);
}

int main() {
  int fd1, fd2, fd3;
  fd1 = open(file, O_RDWR | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
  fd2 = dup(fd1);
  fd3 = open(file, O_RDWR);
  write(fd1, "Hello,", 6); // Hello,
  assert_file("Hello,");
  write(fd2, "world", 6); // Hello,world
  assert_file("Hello,world");
  lseek(fd2, 0, SEEK_SET);
  write(fd1, "HELLO,", 6); // HELLO,world
  assert_file("HELLO,world");
  write(fd3, "Gidday", 6); // Giddayworld
  assert_file("Giddayworld");
  close(fd1);
  close(fd2);
  close(fd3);
}
```

### 5-7

```c
#include <assert.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/param.h>
#include <sys/uio.h>
#include <tlpi_hdr.h>
#include <unistd.h>

int tlpi_readv(int fd, const struct iovec *iov, int count) {
  int size, ino;
  char *buf;
  for (int i = 0; i < count; i++) {
    size += (iov + i)->iov_len;
  }
  buf = malloc(size);
  ino = read(fd, buf, size);
  if (ino != -1) {
    int byte_size = ino;
    for (int i = 0; i < count; i++) {
      const struct iovec *curr = iov + i;
      if (ino > 0) {
        memcpy(curr->iov_base, buf + (size - byte_size),
               MIN(curr->iov_len, byte_size));
        byte_size -= curr->iov_len;
      }
    }
  }
  free(buf);
  return ino;
}

int tlpi_writev(int fd, const struct iovec *iov, int count) {
  int size, ino, offset = 0;
  char *buf;
  for (int i = 0; i < count; i++) {
    size += (iov + i)->iov_len;
  }
  buf = malloc(size);
  for (int i = 0; i < count; i++) {
    const struct iovec *curr = iov + i;
    memcpy(buf + offset, curr->iov_base, curr->iov_len);
    offset += curr->iov_len;
  }
  ino = write(fd, buf, size);
  free(buf);
  return ino;
}

int main() {
  struct iovec iov1[2], iov2[2];
  int fd, ino;
  char *file = "1.txt";
  char *text1 = "hello c";
  char *text2 = "attchen";

  iov1[0].iov_base = malloc(7);
  iov1[0].iov_len = 7;
  iov1[1].iov_base = malloc(7);
  iov1[1].iov_len = 7;

  iov2[0].iov_base = malloc(7);
  iov2[0].iov_len = 7;
  iov2[1].iov_base = malloc(7);
  iov2[1].iov_len = 7;

  fd = open(file, O_RDWR | O_CREAT | O_TRUNC, 0644);

  memcpy(iov1[0].iov_base, text1, 7);
  memcpy(iov1[1].iov_base, text2, 7);
  ino = writev(fd, iov1, 2);
  if (ino == -1)
    errExit("writev");
  ino = lseek(fd, 0, SEEK_SET);
  if (ino == -1)
    errExit("lseek1");
  ino = tlpi_readv(fd, iov2, 2);
  if (ino == -1)
    errExit("tlpi_readv");
  assert(memcmp(iov1[0].iov_base, iov2[0].iov_base, iov1[0].iov_len) == 0);
  assert(memcmp(iov1[1].iov_base, iov2[1].iov_base, iov1[1].iov_len) == 0);
  assert(memcmp(iov1[0].iov_base, text1, iov1[0].iov_len) == 0);
  assert(memcmp(iov1[1].iov_base, text2, iov1[1].iov_len) == 0);

  ino = ftruncate(fd, 0);
  if (ino == -1)
    errExit("ftruncate");
  ino = lseek(fd, 0, SEEK_SET);
  if (ino == -1)
    errExit("lseek");
  memcpy(iov2[0].iov_base, text2, 8);
  memcpy(iov2[1].iov_base, text1, 8);
  ino = tlpi_writev(fd, iov2, 2);
  if (ino == -1)
    errExit("tlpi_writev");
  ino = lseek(fd, 0, SEEK_SET);
  if (ino == -1)
    errExit("lseek2");
  ino = readv(fd, iov1, 2);
  if (ino == -1)
    errExit("readv");
  assert(memcmp(iov1[0].iov_base, iov2[0].iov_base, iov1[0].iov_len) == 0);
  assert(memcmp(iov1[1].iov_base, iov2[1].iov_base, iov1[1].iov_len) == 0);
  assert(memcmp(iov2[0].iov_base, text2, iov1[0].iov_len) == 0);
  assert(memcmp(iov2[1].iov_base, text1, iov1[1].iov_len) == 0);

  free(iov1[0].iov_base);
  free(iov1[1].iov_base);
  free(iov2[0].iov_base);
  free(iov2[1].iov_base);
}
```

## 第六章

### 6-1

10MB 的数组指的是变量`main.mbuf`，它没有被初始化，是分配到 bss 段，在最后生成的代码中只记录的大小。

```CQL
// 方式1 初始化 mbuf会被分配到 data segment
static char mbuf[10240000] = {1};
// 方式2 赋值 mbuf被分配到 bss segment
static char mbuf[10240000];
mbuf[0]=1;
```

![6-1-1](../assets/tlpi/6-1-1.png)

但是如果对 mbuf 进行初始化，会在最后的 binaray 占用 10MB 的空间存储 mbuf 的值，程序运行时再直接拷贝到 data segment。bss 区的数据不用去占据 ELF 文件的磁盘空间。

[https://stackoverflow.com/questions/16557677/difference-between-data-section-and-the-bss-section-in-c](https://stackoverflow.com/questions/16557677/difference-between-data-section-and-the-bss-section-in-c)

> Data
>
> The values for these variables are initially stored within the read-only memory (typically within the code segment) and are copied into the data segment during the start-up routine of the program.

### 6-2

```c
#include <setjmp.h>
#include <tlpi_hdr.h>

static jmp_buf env;

void f1() {
  printf("in f1\n");
  if (setjmp(env) == 1) {
    printf("jump from f2()\n");
  }
}

void f2() {
  printf("in f2\n");
  longjmp(env, 1);
}

int main() {
  f1();
  f2();
}
```

### 6-3

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <tlpi_hdr.h>

#define TLPI_ENV_SUCCESS 1

extern char **environ;

int tlpi_setenv(const char *name, const char *value, int overwrite) {
  char *str;
  int l_name, l_value, ino;

  str = getenv(name);
  if (str != NULL && !overwrite) {
    return TLPI_ENV_SUCCESS;
  }
  if (str != NULL) {
    free(str);
  }
  l_name = strlen(name);
  l_value = strlen(value);
  str = malloc(l_name + l_value + 2);
  strcpy(str, name);
  strcpy(str + l_name + 1, value);
  str[l_name] = '=';
  ino = putenv(str);
  return ino;
};

int tlpi_unsetenv(const char *name) {
  extern char **environ;
  char **ep_curr, **ep_end;
  int ep_len;
  for (ep_curr = environ; *ep_curr != NULL; ep_curr++) {
  }
  ep_len = ep_curr - environ;
  ep_end = environ + ep_len;
  for (ep_curr = environ; ep_curr != ep_end; ep_curr++) {
    char *name_p1 = *ep_curr, *name_p2 = (char *)(name);
    while (*name_p1 == *name_p2 && *name_p2 != 0) {
      name_p1++;
      name_p2++;
    }
    if (*name_p1 == '=' && *name_p2 == 0) {
      ep_end--;
      if (ep_curr == ep_end) {
        *ep_curr = NULL;
      } else {
        *ep_curr = *ep_end;
        *ep_end = NULL;
      }
      continue;
    }
  }
  return TLPI_ENV_SUCCESS;
};

int main() {
  char *key1 = "TLPI_TEST", *value1 = "cattchen", *key2 = "TLPI_TEST_2",
       *value2 = "value2";
  int ino;

  clearenv();
  ino = tlpi_setenv(key1, value1, 1);
  if (ino == -1) {
    errExit("tlpi_setenv1");
  }
  assert(strcmp(getenv(key1), value1) == 0);
  ino = tlpi_setenv(key2, value2, 1);
  if (ino == -1) {
    errExit("tlpi_setenv2");
  }
  ino = tlpi_setenv(key2, value1, 0);
  if (ino == -1) {
    errExit("tlpi_setenv3");
  }
  assert(strcmp(getenv(key2), value2) == 0);

  ino = tlpi_unsetenv(key2);
  if (ino == -1) {
    errExit("tlpi_unsetenv1");
  }
  assert(getenv(key2) == NULL);
  ino = tlpi_unsetenv(key1);
  if (ino == -1) {
    errExit("tlpi_unsetenv2");
  }
  assert(getenv(key1) == NULL);
}
```

## 第七章

### 7-1

![7-1-1](../assets/tlpi/7-1-1.png)

```c
#include <tlpi_hdr.h>
#define MAX_ALLOCS 1000000

int main(int argc, char *argv[]) {
  char *ptr[MAX_ALLOCS];
  int freeStep, freeMin, freeMax, blockSize, numAllocs, j;
  printf("\n");
  if (argc < 3)
    usageErr("%s num-allocs block-size [step [min [max]]]\n", argv[0]);

  numAllocs = getInt(argv[1], GN_GT_0, "num-allocs");
  if (numAllocs > MAX_ALLOCS)
    cmdLineErr("free-max > num-allocs\n");

  blockSize = getInt(argv[2], GN_GT_0 | GN_ANY_BASE, "bolck-size");

  freeStep = (argc > 3) ? getInt(argv[3], GN_GT_0, "step") : 1;
  freeMin = (argc > 4) ? getInt(argv[4], GN_GT_0, "min") : 1;
  freeMax = (argc > 5) ? getInt(argv[5], GN_GT_0, "max") : numAllocs;

  if (freeMax > numAllocs)
    cmdLineErr("free-max > num-allocs\n");

  printf("Initial program brea: %10p\n", sbrk(0));
  printf("Allocating %d*%d bytes\n", numAllocs, blockSize);
  for (j = 0; j < numAllocs; j++) {
    ptr[j] = malloc(blockSize);
    if (ptr[j] == NULL)
      errExit("malloc");
    printf("Current Program Break %10p\n", sbrk(0));
  }

  printf("Program break is now %10p\n", sbrk(0));
  printf("Freeing blocks from %d to %d in steps of %d\n", freeMin, freeMax,
         freeStep);

  for (j = freeMin - 1; j < freeMax; j += freeStep)
    free(ptr[j]);
  printf("After free(),program break is %10p\n", sbrk(0));
  exit(EXIT_SUCCESS);
}
```

### 7-2

主要是踩了一个坑，调试花了比较长的时间，指针值进行相加减时，会有隐式的类型转换，最后得到的结果也不是我预想的字节数。同时标准库的 printf 有调用 malloc 建立缓冲区需要注意。

![7-2-1](../assets/tlpi/7-2-1.png)

```c
#include <assert.h>
#include <stdarg.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define PRINT_BUFFER_SIZE 200
char msgbuf[PRINT_BUFFER_SIZE];

// printf 会使用glibc/malloc
int tlpi_printf(char *format, ...) {
  va_list arglist;
  int ret, len;
  va_start(arglist, format);
  vsnprintf(msgbuf, PRINT_BUFFER_SIZE, format, arglist);
  len = strlen(msgbuf);
  ret = write(STDOUT_FILENO, msgbuf, len);
  va_end(arglist);
  return ret;
};

/**
 * low address               ->           high address
 * malloc_meta|buffer|...|malloc_meta|buffer|
 *  ↑                      ↑
 * [malloc_meta_first]    [malloc_meta_last]
 */
typedef struct malloc_meta {
  // TODO *prev *next 减小体积
  struct malloc_meta *prev;
  struct malloc_meta *next;
  unsigned short is_in_use : 1;
} malloc_meta;

#define MALLOC_META_SIZE (sizeof(malloc_meta))
#define MALLOC_META_INUSE 1
#define MALLOC_META_NOUSE 0
#define malloc_size(curr)                                                      \
  (((char *)(curr) - (char *)(curr->prev)) - sizeof(malloc_meta))

static malloc_meta *malloc_meta_first = NULL; // address of first malloc_meta
static malloc_meta *malloc_meta_last = NULL;  // address of last malloc_meta

void *tlpi_malloc(int size) {
  if (size < 0)
    return NULL;
  malloc_meta *curr = malloc_meta_first, *candidate = NULL;
  size_t curr_size, candidate_size = SIZE_MAX;
  while (curr) {
    curr_size = malloc_size(curr);
    if (curr->is_in_use == MALLOC_META_NOUSE && curr_size >= size &&
        curr_size < candidate_size) {
      candidate = curr;
      candidate_size = curr_size;
    }
    curr = curr->next;
  }
  if (candidate == NULL) {
    void *ino;
    ino = sbrk(size + MALLOC_META_SIZE);
    if (ino == (void *)(-1)) {
      return NULL;
    }
    candidate = ino;
    if (malloc_meta_first == NULL) {
      malloc_meta_first = candidate;
    } else {
      malloc_meta_last->next = candidate;
      candidate->prev = malloc_meta_last;
    }
    malloc_meta_last = candidate;
  } else if (candidate->prev != NULL) {
    malloc_meta *rest;
    size_t rest_size;
    rest_size = malloc_size(candidate) - size;
    if (rest_size > MALLOC_META_SIZE) {
      rest = (malloc_meta *)((char *)(candidate) + MALLOC_META_SIZE + size);
      rest->is_in_use = MALLOC_META_NOUSE;
      if (candidate != malloc_meta_last) {
        candidate->next->prev = rest;
      }
      rest->next = candidate->next;
      rest->prev = candidate;
      candidate->next = rest;
    }
  }
  candidate->is_in_use = MALLOC_META_INUSE;
  return (void *)((char *)(candidate) + MALLOC_META_SIZE);
};

void tlpi_free(void *ptr) {
  malloc_meta *curr;
  size_t curr_size;
  curr = (malloc_meta *)((char *)(ptr)-MALLOC_META_SIZE);
  curr->is_in_use = MALLOC_META_NOUSE;
  while (curr && curr == malloc_meta_last &&
         curr->is_in_use == MALLOC_META_NOUSE) {
    curr_size = malloc_size(curr) + MALLOC_META_SIZE;
    sbrk(-curr_size);
    curr = curr->prev;
    malloc_meta_last = curr;
  }
  if (malloc_meta_last == NULL) {
    malloc_meta_first = NULL;
  }
};

int main() {
  int *ptr_arr[20];
  for (int i = 0; i < 20; i++) {
    ptr_arr[i] = tlpi_malloc(sizeof(int) * (20 - i));
    *ptr_arr[i] = i + 1;
  }
  for (int i = 0; i < 20; i++) {
    assert(*ptr_arr[i] == i + 1);
  }
  for (int i = 0; i < 10; i++) {
    tlpi_free(ptr_arr[i]);
    ptr_arr[i] = tlpi_malloc(sizeof(int) * (i + 1));
    *ptr_arr[i] = i + 1;
  }
  for (int i = 0; i < 20; i++) {
    assert(*ptr_arr[i] == i + 1);
  }
}
```

## 第八章

### 8-1

这个问题本身是有的问题的，示例代码可能被优化为两种结果（这个取决于编译器），同时两次`getpwnam`返回的是同一个指针，只是两次这个指针指向的内容不同，所以才导致了这个现象。

https://stackoverflow.com/questions/37043139/statically-allocated-variable-when-using-getpwnam

```c
// 原始代码
printf("%ld %ld\n", (long)(getpwnam("cattchen")->pw_uid), (long)(getpwnam("root")->pw_uid));

// 编译器可能的优化结果1
struct passwd *p1, *p2;
p1 = getpwnam("cattchen");
p2 = getpwnam("root");
printf("%u\n", p1->pw_uid);
printf("%u\n", p2->pw_uid);

// 编译器可能的优化结果2
struct passwd *p1, *p2;
p1 = getpwnam("cattchen");
printf("%u\n", p1->pw_uid);
p2 = getpwnam("root");
printf("%u\n", p2->pw_uid);

// 避免歧义的写法
printf("%ld %ld\n",(long)((*getpwnam("cattchen")).pw_uid),(long)((*getpwnam("root")).pw_uid));
```

### 8-2

```c
#include <assert.h>
#include <pwd.h>
#include <string.h>

struct passwd *tlpi_getpwnam(const char *name) {
  struct passwd *pw;
  setpwent();
  do {
    pw = getpwent();
  } while (pw && strcmp(pw->pw_name, name) != 0);
  endpwent();
  return pw;
}

int main() {
  assert((*(getpwnam("root"))).pw_uid == (*(tlpi_getpwnam("root"))).pw_uid);
  assert((*(getpwnam("cattchen"))).pw_uid ==
         (*(tlpi_getpwnam("cattchen"))).pw_uid);
}
```

## 第九章

### 9-1

```c

```
