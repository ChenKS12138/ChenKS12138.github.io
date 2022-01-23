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

### 4-38

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define N 100

typedef int Item;
typedef unsigned int deque_size;

typedef struct deque {
    Item data[N];
    deque_size begin;
    deque_size end;
} * deque;

deque deque_new() {
    deque d = malloc(sizeof(*d));
    d->begin = 0;
    d->end = 0;
    return d;
};

int deque_push_back(deque d, Item item) {
    if ((d->end + 1) % N == d->begin)
        return 1;
    d->data[d->end] = item;
    d->end = (d->end + 1) % N;
    return 0;
}

int deque_push_front(deque d, Item item) {
    if ((d->end + 1) % N == d->begin)
        return 1;
    d->begin = (d->begin - 1 + N) % N;
    d->data[d->begin] = item;
    return 0;
}

int deque_pop_back(deque d, Item* item) {
    if (d->end == d->begin)
        return 1;
    d->end = (d->end - 1 + N) % N;
    *item = d->data[d->end];
    return 0;
}

int deque_pop_front(deque d, Item* item) {
    if (d->end == d->begin)
        return 1;
    *item = d->data[d->begin];
    d->begin = (d->begin + 1) % N;
    return 0;
}

int main() {
    Item item;
    deque d = deque_new();
    assert(deque_push_back(d, 1) == 0);
    assert(deque_push_back(d, 2) == 0);
    assert(deque_push_back(d, 3) == 0);
    assert(deque_push_back(d, 4) == 0);
    assert(deque_pop_front(d, &item) == 0);
    assert(item == 1);
    assert(deque_pop_back(d, &item) == 0);
    assert(item == 4);
    assert(deque_push_front(d, 5) == 0);
    assert(deque_push_front(d, 6) == 0);
    assert(deque_pop_front(d, &item) == 0);
    assert(item == 6);
    assert(deque_pop_back(d, &item) == 0);
    assert(item == 3);
}
```

### 4-39

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link prev;
    link next;
};

typedef struct deque {
    link head;
    link tail;
} * deque;

deque deque_new() {
    deque d = malloc(sizeof(struct deque));
    d->tail = d->head = NULL;
    return d;
}

int deque_push_back(deque d, Item item) {
    if (d->tail == NULL) {
        d->tail = d->head = malloc(sizeof(struct node));
        d->tail->next = d->tail->prev = NULL;
        d->tail->item = item;
    } else {
        d->tail->next = malloc(sizeof(struct node));
        d->tail->next->item = item;
        d->tail->next->prev = d->tail;
        d->tail->next->next = NULL;
        d->tail = d->tail->next;
    }
    return 0;
}

int deque_push_front(deque d, Item item) {
    if (d->head == NULL) {
        d->head = d->tail = malloc(sizeof(struct node));
        d->head->prev = d->head->next = NULL;
        d->head->item = item;
    } else {
        d->head->prev = malloc(sizeof(struct node));
        d->head->prev->item = item;
        d->head->prev->next = d->head;
        d->head->prev->prev = NULL;
        d->head = d->head->prev;
    }
    return 0;
}

int deque_pop_back(deque d, Item* item) {
    if (d->head == d->tail)
        return 1;
    *item = d->tail->item;
    d->tail = d->tail->prev;
    free(d->tail->next);
    d->tail->next = NULL;
    return 0;
}

int deque_pop_front(deque d, Item* item) {
    if (d->head == d->tail)
        return 1;
    *item = d->head->item;
    d->head = d->head->next;
    free(d->head->prev);
    d->head->prev = NULL;
    return 0;
}

int main() {
    Item item;
    deque d = deque_new();
    assert(deque_push_back(d, 1) == 0);
    assert(deque_push_back(d, 2) == 0);
    assert(deque_push_back(d, 3) == 0);
    assert(deque_push_back(d, 4) == 0);
    assert(deque_pop_front(d, &item) == 0);
    assert(item == 1);
    assert(deque_pop_back(d, &item) == 0);
    assert(item == 4);
    assert(deque_push_front(d, 5) == 0);
    assert(deque_push_front(d, 6) == 0);
    assert(deque_pop_front(d, &item) == 0);
    assert(item == 6);
    assert(deque_pop_back(d, &item) == 0);
    assert(item == 3);
}
```

### 4-40

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link prev;
    link next;
};

typedef struct queue {
    link head;
    link tail;
} * queue;

queue queue_new() {
    queue q = malloc(sizeof(struct queue));
    q->head = q->tail = NULL;
    return q;
};

int queue_push(queue q, Item item) {
    if (q->tail == NULL) {
        q->head = q->tail = malloc(sizeof(struct node));
        q->head->next = q->head->prev = q->head;
        q->head->item = item;
    } else {
        q->tail->next = malloc(sizeof(struct node));
        q->tail->next->prev = q->tail;
        q->tail = q->tail->next;
        q->tail->item = item;
        q->tail->next = q->head;
    }
    return 0;
}

int queue_pop(queue q, Item* item) {
    if (q->head == NULL)
        return 1;
    if (q->head == q->tail) {
        *item = q->head->item;
        q->head = NULL;
        q->tail = NULL;
    } else {
        q->tail->next = q->head->next;
        *item = q->head->item;
        q->head = q->head->next;
    }
    return 0;
}

int main() {
    Item item;
    queue q = queue_new();
    assert(queue_push(q, 1) == 0);
    assert(queue_push(q, 2) == 0);
    assert(queue_push(q, 3) == 0);
    assert(queue_pop(q, &item) == 0);
    assert(item == 1);
    assert(queue_pop(q, &item) == 0);
    assert(item == 2);
    assert(queue_pop(q, &item) == 0);
    assert(item == 3);
}
```

## 第五章

### 5-1

```c
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

long double foo(long n) { return n <= 0 ? 0 : log10(n) + foo(n - 1); }

int main() {
    //
}
```

### 5-5

```c
#include <assert.h>
#include <stdio.h>

int gcd(int a, int b) {
    int t;
    while (b != 0) {
        t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    //
    assert(gcd(24, 64) == 8);
}
```

### 5-9

```c
// 非递归
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

typedef int Item;
typedef struct node* link;
struct node {
    Item item;
    link next;
};

typedef link stack;

stack stack_new() {
    stack s = malloc(sizeof(struct node));
    s->next = NULL;
    return s;
}

int stack_empty(stack s) { return s->next == NULL; }

int stack_push(stack s, Item item) {
    link n = malloc(sizeof(struct node));
    n->next = s->next;
    n->item = item;
    s->next = n;
    return 0;
}

int stack_pop(stack s, Item* item) {
    if (stack_empty(s))
        return 1;
    link t;
    t = s->next;
    *item = t->item;
    s->next = s->next->next;
    free(t);
    return 0;
}

int eval(const char* s) {
    stack st = stack_new();
    Item item1, item2;
    int i = 0, t;
    while (s[i] != 0) {
        while (s[i] == ' ')
            i++;
        if (s[i] >= '0' && s[i] <= '9') {
            item1 = 0;
            while (s[i] >= '0' && s[i] <= '9')
                item1 = item1 * 10 + s[i++] - '0';
            assert(stack_push(st, item1) == 0);
        } else {
            assert(stack_pop(st, &item2) == 0);
            assert(stack_pop(st, &item1) == 0);
            switch (s[i++]) {
            case '+':
                item1 = item1 + item2;
                break;
            case '-':
                item1 = item1 - item2;
                break;
            case '*':
                item1 = item1 * item2;
                break;
            case '/':
                item1 = item1 / item2;
                break;
            default:
                assert(0);
            }
            assert(stack_push(st, item1) == 0);
        }
    }
    assert(stack_pop(st, &item1) == 0);
    return item1;
}

int main() {
    const char* s = "1 2 3 * +";
    int result;
    result = eval(s);
    assert(result == 7);
}
```
