---
title: 《the linux programming interface》练习
date: 2021-09-28 15:58:01
tags: ["随笔"]
index_img: ../assets/linux-programming-interface/the-linux-programming-interface.png
---

[《the linux programming interface》](https://man7.org/tlpi/index.html)

# 习题

## 第三章

### 3.1

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
    perror("Reboot");
    exit(EXIT_FAILURE);
  }
  exit(EXIT_SUCCESS);
}
```
