---
title: Primer C++ 练习
date: 2021-11-14 16:32:24
tags: ["随笔"]
index_img:
---

## CH1

### 1-9

```cpp
#include <iostream>

int main() {
    int s = 50, sum = 0;
    while (s <= 100) {
        sum += (s++);
    }
    std::cout << sum << std::endl;
    return 0;
}
```

### 1-10

```cpp
#include <iostream>

int main() {
    using namespace std;
    int s;
    s = 10;
    do {
        cout << s << endl;
    } while (s-- > 0);
    return 0;
}
```

### 1-11

```cpp
#include <iostream>

int main() {
    using namespace std;
    int a, b;
    cout << "Input two interger:" << endl;
    cin >> a >> b;
    while (a < b) {
        cout << (a++) << endl;
    }
    return 0;
}
```

### 1-12

进行了从[-100,100]数值的求和，sum 最终值为 0

### 1-16

```cpp
#include <iostream>

int main() {
    using namespace std;
    int size, *arr, sum;
    cin >> size;
    arr = new int[size];
    for (int i = 0; i < size; i++) {
        cin >> arr[i];
    }
    sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    cout << sum << endl;
}
```

### 1-20

```cpp
#include "include/1/Sales_item.h"
#include <iostream>

int main() {
    using namespace std;
    Sales_item item[] = {{"book1"}, {"book2"}, {"book3"}};
    for (int i = 0; i < 3; i++) {
        cout << item[i] << endl;
    }
    return 0;
}
```

### 1-21

```cpp
#include "include/1/Sales_item.h"
#include <iostream>

int main() {
    using namespace std;
    Sales_item item1, item2;
    cin >> item1 >> item2;
    if (item1.isbn() == item2.isbn()) {
        cout << item1 + item2 << endl;
        return 0;
    } else {
        cerr << "Date must refer to same ISBN" << endl;
        return -1;
    }
}
```

## CH2

### 2-3

```cpp
#include <iostream>

using namespace std;

int main() {
    using namespace std;
    unsigned u = 10, u2 = 42;
    cout << u2 - u << endl;
    cout << u - u2 << endl;

    int i = 10, i2 = 42;
    cout << i2 - i << endl;
    cout << i - i2 << endl;
    cout << i - u << endl;
    cout << u - i << endl;
}
```

### 2-5

(a) char, wchat_t, std::string, const wchat_t []

(b) int, unsigned int, long, unsigned long, int 八进制, int 十六进制

(c) double, float, long double

(d) int, unsigned int, double, double

### 2-6

`09`不是合法的字面值常量

### 2-7

(a) std::string

(b) long double

(c) float

(d) long double

### 2-8

```cpp
#include <iostream>

int main() {
    using namespace std;
    cout << "2M\r\n";
    cout << "2\tM\r\n";
    return 0;
}
```

## CH3

### 3-2

```cpp
#include <iostream>
using namespace std;

void do_readline() {
    string line;
    while (getline(cin, line))
        cout << line << endl;
}

void do_readword() {
    string word;
    while (1) {
        cin >> word;
        cout << word << endl;
    }
}

int main() {
    // do_readline();
    // do_readword();
    return 0;
}
```

### 3-3

string 类的输入操作符会将空白字符串作为分隔符，而 getline 不会

### 3-4

```cpp
#include <iostream>

using namespace std;

int main() {
    using namespace std;
    string s1, s2;
    cin >> s1 >> s2;
    if (s1 == s2) {
        cout << "equal" << endl;
    } else {
        cout << (s1 > s1 ? s1 : s2) << endl;
    }
}
```

### 3-5

```cpp
#include <iostream>

int main() {
    using namespace std;
    string res, s;
    while (cin >> s)
        res += s;
    cout << res << endl;
}
```

### 3-6

```cpp
#include <iostream>

int main() {
    using namespace std;
    string s = "Helllo cattchen";
    for (auto& c : s) {
        c = 'X';
    }
    cout << s << endl;
}
```

### 3-7

不能进行替换，需要使用引用，否则为 char 的拷贝

```cpp
#include <iostream>

int main() {
    using namespace std;
    string s = "Helllo cattchen";
    for (char c : s) {
        c = 'X';
    }
    cout << s << endl;
}
```

### 3-9

可以运行不报错

```cpp
#include <iostream>

int main() {
    using namespace std;
    string s;
    cout << s[0] << endl;
    cout << s.capacity() << endl;
}
```

### 3-10

```cpp
#include <cctype>
#include <iostream>

int main() {
    using namespace std;
    string s;
    getline(cin, s);
    for (auto& c : s) {
        if (ispunct(c)) {
            c = ' ';
        }
    }
    cout << s << endl;
}
```

### 3-11

不合法，c 的类型为 const char&

### 3-12

(a) 正确，空的 int vector

(b) 不正确，拷贝构造的参数类型不匹配

(c) 正确，大小的 10 的 vector 且每个元素为"null"

### 3-13

(a) 0

(b) 10, 都为 0

(c) 10, 都为 42

(d) 1, 为 10

(e) 2, 为 10 42

(f) 10, 都为空 string

(g) 10, 都为"hi"

### 3-14

```cpp
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    vector<int> arr;
    string s;
    while (cin >> s)
        arr.push_back(stoi(s));
    cout << "input done!" << endl;
    for (const auto& n : arr)
        cout << n << endl;
}
```

### 3-15

```cpp
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    string s;
    vector<string> arr;
    while (cin >> s)
        arr.push_back(s);
    return 0;
}
```

### 3-17

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    vector<string> vstr;
    string line;
    while (cin >> line)
        vstr.push_back(line);
    for (auto& s : vstr) {
        transform(s.begin(), s.end(), s.begin(), ::toupper);
    }
    for (auto& s : vstr) {
        cout << s << endl;
    }
    return 0;
}
```

### 3-18

不合法，需要改用 push_back

### 3-19

```cpp
// 1
vector<int> arr (10,42);
// 2
vector<int> arr(10);
for(auto &n:arr)
	  n = 42;
// 3
vector<int> arr;
for(int i=0;i<10;i++)
  	arr.push_back(42);
```

### 3-20

```cpp
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    vector<int> ivec;
    string s;
    while (cin >> s)
        ivec.push_back(stoi(s));
    for (int i = 0; i < ivec.size() - 1; i++) {
        cout << ivec[i] + ivec[i + 1] << endl;
        cout << ivec[ivec.size() - 1 - i] + ivec[ivec.size() - 2 - i] << endl;
    }
    return 0;
}
```

### 3-23

```cpp
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    vector<int> ivec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    for (auto it = ivec.begin(); it != ivec.end(); it++)
        *it = *it * 2;
    for (const auto& n : ivec)
        cout << n << endl;
    return 0;
}
```

### 3-25

```cpp
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    vector<unsigned> scores(11, 0);
    unsigned grade;
    while (cin >> grade)
        if (grade <= 100)
            *(scores.begin() + (grade / 10)) += 1;
    for (const auto& n : scores) {
        cout << n << " ";
    }
    cout << endl;
    return 0;
}
```

### 3-26

迭代器相加减没有意义

### 3-27

ac 都为非法，引起编译报错，b 正确，d 编译通过，但是可能在运行时产生错误

### 3-28

sa 为 10 个 string 对象，都为空字符串

ia 为 10 个 int，都为 0，

sa2 为 10 个 string 对象，都为空字符串

ia2 为 10 个 int，为随机数

### 3-29

不能 memcpy 直接对 vector 所在内存直接进行复制，达到拷贝的目的

### 3-30

访问下标为 array_size 的元素时，出现越界，可能引起段错误

### 3-31

```cpp
#include <iostream>

int main() {
    using namespace std;
    constexpr size_t array_size = 10;
    int arr[array_size];
    for (int i = 0; i < array_size; i++)
        arr[i] = i;
    return 0;
}
```

### 3-34

表达式的值为 p2。指针值进行相加减时是非法的。

### 3-35

```cpp
#include <iostream>

int main() {
    int arr[] = {1, 2, 3, 4};
    for (int i = 0; i < 4; i++)
        arr[i] = 0;
    return 0;
}
```

### 3-36

```cpp
#include <iostream>
#include <vector>

bool array_compare(int a[], int b[], ssize_t len) {
    for (ssize_t i = 0; i < len; i++) {
        if (a[i] != b[i])
            return false;
    }
    return true;
}

template <class T> bool vector_compare(std::vector<T> a, std::vector<T> b) {
    return a == b;
}

int main() {
    using namespace std;
    return 0;
}
```

### 3-37

`hello`每行输出一个字母

### 3-38

指针的值相加减可能越界，且表示的地址无意义

### 3-41

```cpp
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    int arr[] = {1, 2, 3, 4};
    vector<int> ivec(arr, arr + 4);
    for (const auto& n : ivec) {
        cout << n << endl;
    }
    return 0;
}
```

### 3-42

```cpp
#include <cstring>
#include <iostream>
#include <vector>

int main() {
    using namespace std;
    vector<int> ivec{1, 2, 3, 4};
    int arr[4];
    memcpy(arr, ivec.data(), 4 * sizeof(int));
    for (ssize_t i = 0; i < 4; i++)
        cout << arr[i] << endl;
    return 0;
}
```

## CH4

### 4-1

105

## CH6

### 6-1

实参为实际传入函数的参数，形参为函数中的参数变量

### 6-2

(a) 函数返回类型不正确

(b) 没有注明函数返回类型

(c) 花括号不匹配

(d) 缺少花括号

### 6-3

```cpp
#include <iostream>

int fact(int n) {
    int res = 1;
    for (int i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

int main() {
    using namespace std;
    cout << fact(5) << endl;
}
```

### 6-4

```cpp
#include <iostream>

int fact(int n) {
    int res = 1;
    for (int i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

int main() {
    using namespace std;
    int n;
    while (cin >> n)
        cout << fact(n) << endl;
    return 0;
}
```

### 6-5

```cpp
#include <iostream>

int my_abs(int n) { return n < 0 ? -n : n; }

int main() {
    using namespace std;
    int n;
    while (cin >> n)
        cout << my_abs(n) << endl;
    return 0;
}
```

### 6-7

```cpp
#include <iostream>

int foo() {
    static int s = 0;
    if (!s)
        return s++;
    else
        return s;
}

int main() {
    using namespace std;
    cout << foo() << endl;
    cout << foo() << endl;
    cout << foo() << endl;
}
```

### 6-10

```cpp
#include <iostream>

void my_swap(int* a, int* b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main() {
    using namespace std;
    int a = 1, b = 2;
    cout << a << " " << b << endl;
    my_swap(&a, &b);
    cout << a << " " << b << endl;
    return 0;
}
```

### 6-11

```cpp
#include <iostream>

void reset(int& n) { n = 0; }

int main() {
    using namespace std;
    int s = 123;
    cout << s << endl;
    reset(s);
    cout << s << endl;
    return 0;
}
```

### 6-12

```cpp
#include <iostream>

void my_swap(int& a, int& b) {
    int tmp = a;
    a = b;
    b = tmp;
}

int main() {
    using namespace std;
    int a = 1, b = 2;
    cout << a << " " << b << endl;
    my_swap(a, b);
    cout << a << " " << b << endl;
    return 0;
}
```

### 6-13

第一种为传递变量的拷贝，第二种为传递变量的引用

### 6-16

可以将形参改为`const string&s`

### 6-17

不一样，前者可以传递常量引用，后者不能
