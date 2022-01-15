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
