---
title: 算法C语言实现 练习
date: 2022-01-12T10:15:52.000Z
tags:
  - 随笔
coverImage: ''
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

### 5-51

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int size;
    int val;
} Item;

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }

static Item items[] = {{3, 4}, {4, 5}, {7, 10}, {8, 11}, {9, 13}};

int knap(int cap) {
    int a, b, i, j, *arr, item_len;
    arr = malloc(sizeof(int) * (cap + 1));
    memset(arr, 0, (cap + 1) * sizeof(int));
    item_len = sizeof(items) / sizeof(items[0]);
    for (i = 0; i < min(item_len, cap); i++) {
        arr[items[i].size] = max(arr[items[i].size], items[i].val);
    }
    for (i = 1; i <= cap; i++) {
        for (j = 0; j < item_len; j++) {
            if (i >= items[j].size) {
                arr[i] = max(arr[i], arr[i - items[j].size] + items[j].val);
            }
        }
    }
    j = arr[cap];
    free(arr);
    return j;
}

int main() {
    assert(knap(17) == 24);
    return 0;
}
```

### 5-52

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int size;
    int val;
} Item;

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }

static Item items[] = {{3, 4}, {4, 5}, {7, 10}, {8, 11}, {9, 13}};

static int items_len = sizeof(items) / sizeof(items[0]);

static int tb[1024] = {0};

int knap(int cap) {
    int i, result, tmp;
    if (cap <= 0)
        return cap;
    if (tb[cap] > 0)
        return tb[cap];
    result = 0;
    for (i = 0; i < items_len; i++) {
        tmp = knap(cap - items[i].size);
        if (tmp >= 0) {
            result = max(result, items[i].val + tmp);
        }
    }
    tb[cap] = result;
    return result;
}

int main() {
    int i;
    for (i = 0; i < items_len; i++) {
        tb[items[i].size] = items[i].val;
    }
    assert(knap(17) == 24);
    return 0;
}
```

### 5-82

```c
#include <stdio.h>
#include <stdlib.h>

typedef char tree_node_value;
typedef struct tree_node* tree;
struct tree_node {
    tree_node_value value;
    tree left;
    tree right;
};

typedef struct list_node* list;
struct list_node {
    tree item;
    list next;
};
typedef list stack;

stack stack_init() {
    stack s = malloc(sizeof(*s));
    s->next = NULL;
    return s;
}

int stack_push(stack s, tree item) {
    stack tmp;
    tmp = s->next;
    s->next = malloc(sizeof(*s));
    s->next->next = tmp;
    s->next->item = item;
    return 0;
}

int stack_pop(stack s, tree* item) {
    list tmp;
    if (s->next == NULL)
        return 1;
    *item = s->next->item;
    tmp = s->next;
    s->next = s->next->next;
    free(tmp);
    return 0;
}

int stack_empty(stack s) { return s->next == NULL ? 1 : 0; }

tree tree_init(tree_node_value value, tree left, tree right) {
    tree t = malloc(sizeof(*t));
    t->value = value;
    t->left = left;
    t->right = right;
    return t;
}

void handle_traverse(tree t) { printf("%c ", t->value); }

void traverse(tree t, void (*handler)(tree t)) {
    stack s = stack_init();
    tree curr;
    if (t == NULL)
        return;
    curr = t;
    stack_push(s, curr);
    while (curr->left) {
        curr = curr->left;
        stack_push(s, curr);
    }
    while (!stack_empty(s)) {
        stack_pop(s, &curr);
        handler(curr);
        if (curr->right) {
            curr = curr->right;
            stack_push(s, curr);
            while (curr->left) {
                curr = curr->left;
                stack_push(s, curr);
            }
        }
    }
}

int main() {
    tree t = tree_init(
        'E',
        tree_init('D',
                  tree_init('B', tree_init('A', NULL, NULL),
                            tree_init('C', NULL, NULL)),
                  NULL),
        tree_init('H', tree_init('F', NULL, tree_init('G', NULL, NULL)), NULL));

    traverse(t, handle_traverse);
}
```

### 5-83

```c
#include <stdio.h>
#include <stdlib.h>

typedef char tree_node_value;
typedef struct tree_node* tree;
struct tree_node {
    tree_node_value value;
    tree left;
    tree right;
};

typedef struct list_node* list;
struct list_node {
    tree item;
    list next;
};
typedef list stack;

stack stack_init() {
    stack s = malloc(sizeof(*s));
    s->next = NULL;
    return s;
}

int stack_push(stack s, tree item) {
    stack tmp;
    tmp = s->next;
    s->next = malloc(sizeof(*s));
    s->next->next = tmp;
    s->next->item = item;
    return 0;
}

int stack_pop(stack s, tree* item) {
    list tmp;
    if (s->next == NULL)
        return 1;
    *item = s->next->item;
    tmp = s->next;
    s->next = s->next->next;
    free(tmp);
    return 0;
}

int stack_empty(stack s) { return s->next == NULL ? 1 : 0; }

tree tree_init(tree_node_value value, tree left, tree right) {
    tree t = malloc(sizeof(*t));
    t->value = value;
    t->left = left;
    t->right = right;
    return t;
}

void handle_traverse(tree t) { printf("%c ", t->value); }

void traverse(tree t, void (*handler)(tree t)) {
    stack s = stack_init(), sr = stack_init();
    tree curr = t;
    stack_push(s, curr);
    while (!stack_empty(s)) {
        stack_pop(s, &curr);
        stack_push(sr, curr);
        if (curr->left)
            stack_push(s, curr->left);
        if (curr->right)
            stack_push(s, curr->right);
    }
    while (!stack_empty(sr)) {
        stack_pop(sr, &curr);
        handler(curr);
    }
}

int main() {
    tree t = tree_init(
        'E',
        tree_init('D',
                  tree_init('B', tree_init('A', NULL, NULL),
                            tree_init('C', NULL, NULL)),
                  NULL),
        tree_init('H', tree_init('F', NULL, tree_init('G', NULL, NULL)), NULL));

    traverse(t, handle_traverse);
}
```

### 5-84

```c
#include <stdio.h>
#include <stdlib.h>

typedef char tree_node_value;
typedef struct tree_node* tree;
struct tree_node {
    tree_node_value value;
    tree left;
    tree right;
};

tree tree_init(tree_node_value value, tree left, tree right) {
    tree t = malloc(sizeof(*t));
    t->value = value;
    t->left = left;
    t->right = right;
    return t;
}

tree tree_build(char preorder[], int preorder_begin, int preorder_end,
                char inorder[], int inorder_begin, int inorder_end) {
    int index, len;
    len = preorder_end - preorder_begin;
    switch (len) {
    case 0:
        return NULL;
    case 1:
        return tree_init(preorder[preorder_begin], NULL, NULL);
    }
    for (index = 0; index < inorder_end; index++) {
        if (inorder[inorder_begin + index] == preorder[preorder_begin])
            break;
    }
    return tree_init(
        preorder[preorder_begin],
        tree_build(preorder, preorder_begin + 1, preorder_begin + index + 1,
                   inorder, inorder_begin, preorder_begin + index),
        tree_build(preorder, preorder_begin + index + 1, preorder_end, inorder,
                   preorder_begin + index + 1, inorder_end));
}

typedef tree list_node_value;
typedef struct list_node* list;
struct list_node {
    list_node_value value;
    list next;
};

typedef struct queue {
    list head;
    list tail;
} * queue;

queue queue_init() {
    queue q = malloc(sizeof(*q));
    q->head = q->tail = NULL;
    return q;
}

int queue_push(queue q, list_node_value item) {
    if (q->tail == NULL) {
        q->head = q->tail = malloc(sizeof(*q->head));
        q->head->value = item;
        q->head->next = NULL;
    } else {
        q->tail->next = malloc(sizeof(*q->tail));
        q->tail = q->tail->next;
        q->tail->next = NULL;
        q->tail->value = item;
    }
    return 0;
}

int queue_pop(queue q, list_node_value* item) {
    if (q->head == NULL)
        return -1;
    *item = q->head->value;
    list tmp = q->head;
    if (q->head == q->tail) {
        q->head = q->tail = NULL;
    } else {
        q->head = q->head->next;
    }
    free(tmp);
    return 0;
}

int queue_empty(queue q) { return q->head == NULL; }

void traverse(tree t, void (*handler)(tree t)) {
    tree curr;
    queue q = queue_init();
    queue_push(q, t);
    while (!queue_empty(q)) {
        queue_pop(q, &curr);
        handler(curr);
        if (curr->left)
            queue_push(q, curr->left);
        if (curr->right)
            queue_push(q, curr->right);
    }
}

void handle_traverse(tree t) { printf("%c ", t->value); }

int main() {
    char preorder_traverse[] = {'E', 'D', 'B', 'A', 'C', 'H', 'F', 'G'};
    char inorder_traverse[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'};
    tree t =
        tree_build(preorder_traverse, 0,
                   sizeof(preorder_traverse) / sizeof(preorder_traverse[0]),
                   inorder_traverse, 0,
                   sizeof(inorder_traverse) / sizeof(inorder_traverse[0]));
    traverse(t, handle_traverse);
}
```

## 第六章

### 6-1
