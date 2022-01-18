---
title: 算法C语言实现 练习
date: 2022-01-12 10:15:52
tags: ["随笔"]
---

## 第一章

### 1-4

```c
#include <stdio.h>

#define N 1000

int main() {
    int id[N], p, q, i, t;
    for (i = 0; i < N; i++)
        id[i] = i;
    while (scanf("%d-%d\n", &p, &q) == 2) {
        if (id[p] == id[q]) {
            printf("%d-%d\n", p, q);
            continue;
        }
        for (t = id[p], i = 0; i < N; i++) {
            if (id[i] == t)
                id[i] = id[q];
        }
    }
}

// 1-3
```

### 1-5

```c
#include <stdio.h>

#define N 1000

int main() {
    int id[N], p, q, i;
    int rp, rq;
    for (i = 0; i < N; i++)
        id[i] = i;
    while (scanf("%d-%d\n", &p, &q) == 2) {
        rp = id[p];
        rq = id[q];
        while (id[rp] != rp) {
            rp = id[rp];
        }
        id[p] = rp;
        while (id[rq] != rq) {
            rq = id[rq];
        }
        id[q] = rq;
        if (rp == rq) {
            printf("%d %d\n", p, q);
        }
        id[p] = q;
    }
}
```

## 第三章

### 3-11

```c
#include <stdio.h>

int main() {
    int a[99], b[99], i;

    for (i = 0; i < 99; i++)
        a[i] = 98 - i;

    for (i = 0; i < 99; i++)
        b[i] = b[b[i]];
}
```

### 3-13

```c
#include <stdio.h>

#define N 1000

int main() {
    int i, j;
    int a[N];
    for (i = 2; i < N; i++)
        a[i] = 1;
    for (i = 2; i < N; i++)
        if (a[i])
            for (j = 2; i * j < N; j++)
                a[i * j] = 0;
    for (i = 2; i < N; i++)
        if (a[i])
            printf("%4d ", i);
    printf("\n");
}
```

### 3-24

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

unsigned int link_size(link begin) {
    if (begin == NULL)
        return 0;
    unsigned int size = 1;
    link tmp = begin->next;
    while (tmp != NULL && tmp != begin) {
        tmp = tmp->next;
        size++;
    }
    return size;
}

int main() {
    link t = malloc(sizeof(*t)), begin = t;
    t->item = 1;
    for (int i = 2; i < 10; i++) {
        t = (t->next = malloc(sizeof(*t)));
        t->item = i;
    }
    t->next = begin;
    assert(link_size(t) == 9);
    assert(link_size(begin) == 9);
}
```

### 3-25

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

unsigned int link_distance(link a, link b) {
    unsigned int distance = 0;
    while (a != NULL && a != b) {
        a = a->next;
        distance++;
    }
    return distance;
}

int main() {
    link begin = malloc(sizeof(*begin)), t = begin;
    begin->item = 1;
    begin->next = begin;
    for (int i = 2; i < 10; i++) {
        t = (t->next = malloc(sizeof(*t)));
        t->item = i;
    }
    t->next = begin;
    assert(link_distance(begin, begin->next->next->next->next->next) == 5);
}
```

### 3-26

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

void link_join(link a, link b) {
    if (a == NULL || b == NULL)
        return;
    link t, x;
    t = a->next;
    a->next = b;
    x = b->next;
    while (x != NULL && x->next != b)
        x = x->next;
    if (x == NULL)
        return;
    x->next = t;
}

int main() {
    int i;
    link t1 = malloc(sizeof(*t1)), t2 = malloc(sizeof(*t2)), t1_begin = t1,
         t2_begin = t2;
    t1->item = 1;
    for (i = 2; i < 4; i++) {
        t1 = (t1->next = malloc(sizeof(*t1)));
        t1->item = i;
    }
    t1->next = t1_begin;

    t2->item = 4;
    for (i = 5; i < 7; i++) {
        t2 = (t2->next = malloc(sizeof(*t2)));
        t2->item = i;
    }
    t2->next = t2_begin;

    link_join(t1, t2_begin);

    assert(t1_begin->item == 1);
    assert(t1_begin->next->item == 2);
    assert(t1_begin->next->next->item == 3);
    assert(t1_begin->next->next->next->item == 4);
    assert(t1_begin->next->next->next->next->item == 5);
    assert(t1_begin->next->next->next->next->next->item == 6);
    assert(t1_begin->next->next->next->next->next->next->item == 1);
    assert(t1_begin->next->next->next->next->next->next->next->item == 2);
}
```

### 3-30

```c
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

int main(int argc, char** argv) {
    int i, M, N;
    if (argc < 3)
        return -1;

    M = atoi(argv[1]);
    N = atoi(argv[2]);

    link begin = malloc(sizeof(*begin)), t = begin;
    begin->item = 1;
    begin->next = begin;

    for (i = 2; i <= N; i++) {
        t = (t->next = malloc(sizeof(*t)));
        t->item = i;
    }
    t->next = begin;

    while (t->next != t) {
        for (i = 2; i <= M; i++)
            t = t->next;
        link to_remove = t->next;
        t->next = t->next->next;
        free(to_remove);
        N--;
    }
    printf("%d\n", t->item);
}
```

### 3-34

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

link move_biggest_to_end(link head) {
    link *curr = &head, *biggest = &head;
    while (*curr != NULL) {
        if ((*curr)->item > (*biggest)->item) {
            biggest = curr;
        }
        curr = &(*curr)->next;
    }
    link tmp;
    tmp = (*biggest)->next;
    (*curr) = *biggest;
    (*biggest)->next = NULL;
    (*biggest) = tmp;
    return head;
}

int main() {
    link begin = malloc(sizeof(*begin)), t = begin;
    begin->item = 9;
    for (int i = 2; i < 6; i++) {
        t = (t->next = malloc(sizeof(*t)));
        t->item = i;
    }
    t->next = NULL;
    begin = move_biggest_to_end(begin);
    assert(begin->item == 2);
    assert(begin->next->item == 3);
    assert(begin->next->next->item == 4);
    assert(begin->next->next->next->item == 5);
    assert(begin->next->next->next->next->item == 9);
}
```

### 3-35

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

link move_smallest_to_begin(link head) {
    link *current = &head, *smallest = &head;
    while (*current != NULL) {
        if ((*current)->item < (*smallest)->item) {
            smallest = current;
        }
        current = &(*current)->next;
    }
    current = &head;
    link tmp1, tmp2;
    tmp1 = (*smallest)->next;
    tmp2 = (*current);
    *current = *smallest;
    (*current)->next = tmp2;
    (*smallest) = tmp1;
    return head;
}

int main() {
    int i;
    link begin = malloc(sizeof(*begin)), t = begin;
    begin->item = 9;
    for (i = 2; i < 6; i++) {
        t = (t->next = malloc(sizeof(*t)));
        t->item = i;
    }
    t->next = NULL;
    begin = move_smallest_to_begin(begin);
    assert(begin->item == 2);
    assert(begin->next->item == 9);
    assert(begin->next->next->item == 3);
    assert(begin->next->next->next->item == 4);
    assert(begin->next->next->next->next->item == 5);
}
```

### 3-36

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

link move_even_after_odd(link head) {
    int i;
    link *current = &head, *tail = &head, *end;
    while (*tail != NULL)
        tail = &(*tail)->next;
    end = tail;
    for (i = 1; current != end; i++) {
        if (i % 2 == 0) {
            *tail = *current;
            *current = (*current)->next;
            (*tail)->next = NULL;
            tail = &(*tail)->next;
        } else {
            current = &(*current)->next;
        }
    }
    return head;
}

int main() {
    int i;
    link begin = malloc(sizeof(*begin)), t = begin;
    begin->item = 1;
    for (i = 2; i < 10; i++) {
        t = (t->next = malloc(sizeof(*t)));
        t->item = i;
    }
    t->next = NULL;
    begin = move_even_after_odd(begin);
    assert(begin->item == 1);
    assert(begin->next->item == 3);
    assert(begin->next->next->item == 5);
    assert(begin->next->next->next->item == 7);
    assert(begin->next->next->next->next->item == 9);
    assert(begin->next->next->next->next->next->item == 2);
    assert(begin->next->next->next->next->next->next->item == 4);
    assert(begin->next->next->next->next->next->next->next->item == 6);
    assert(begin->next->next->next->next->next->next->next->next->item == 8);
}
```

### 3-56

```c
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

void print_char_table(const char* s) {
    unsigned int table[256];
    const char* t;
    int i;
    for (i = 0; i < 256; i++)
        table[i] = 0;
    for (t = s; *t != 0; t++) {
        table[*t]++;
    }
    for (i = 0; i < 256; i++) {
        if (table[i])
            printf("%c %d\n", i, table[i]);
    }
}

int main() {
    print_char_table("hello");
    return 0;
}
```

### 3-57

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

unsigned int is_palindrome(const char* s) {
    unsigned int size;
    const char *begin, *end;

    size = strlen(s);

    begin = s;
    end = s + size - 1;
    while (begin < end) {
        while (*begin == ' ')
            begin++;
        while (*end == ' ')
            end--;
        if (*begin != *end)
            return 0;
        begin++;
        end--;
    }

    return 1;
}

int main() {
    assert(is_palindrome("hell") == 0);
    assert(is_palindrome("if i had a hifi") == 1);
}
```

## 第四章
