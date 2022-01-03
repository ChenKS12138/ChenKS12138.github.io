---
title: Primer C++ 练习
date: 2021-11-14 16:32:24
tags: ["随笔"]
index_img:
---

## 第一章

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

## 第二章

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

## 第三章

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

## 第四章

### 4-1

105

## 第六章

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

## 第七章

### 7-5

这些函数应该是 const，函数并不修改类内对象，使用 const 成员函数可以同时兼容 const 和非 const Person 对象

### 7-16

无限制

### 7-17

使用 class 和 struct 唯一的区别是默认的访问权限，class 默认是 private，struct 默认是 public

### 7-18

封装通过访问说明符隐藏了类的实现细节，确保用户代码不会无意间破坏封装对象的状态

### 7-19

对外暴露的成员函数为 public，私有的成员变量为 private

## 第八章

### 8-1

```cpp
istream& read_all(istream& in) {
    char c;
    while (!in.eof()) {
        in >> c;
        cout << c << endl;
    }
    in.clear();
    return in;
}
```

### 8-3

用于确定流对象状态是否良好

### 8-4

```cpp
int main() {
    using namespace std;
    vector<string> lines;
    string line;
    ifstream in("in.txt");
    while (in >> line)
        lines.push_back(line);
    return 0;
}
```

### 8-5

```cpp
int main() {
    using namespace std;
    vector<string> lines;
    string line;
    ifstream in("in.txt");
    while (getline(in, line, ' '))
        lines.push_back(line);
    return 0;
}
```

### 8-6

```cpp
int main(int argc, const char* argv[]) {
    using namespace std;
    fstream f(argv[1]);
    string s;
    while (getline(f, s))
        cout << s << endl;
    return 0;
}
```

### 8-7

```cpp
int main(int argc, const char* argv[]) {
    using namespace std;
    ifstream inf(argv[1]);
    ofstream outf(argv[2]);

    string s;
    while (inf >> s) {
        transform(s.begin(), s.end(), s.begin(), ::toupper);
        outf << s << endl;
    }
    return 0;
}
```

### 8-8

```cpp
int main(int argc, const char* argv[]) {
    using namespace std;
    ifstream inf(argv[1]);
    ofstream outf(argv[2], ios_base::app);

    string s;
    while (inf >> s) {
        transform(s.begin(), s.end(), s.begin(), ::toupper);
        outf << s << endl;
    }
    return 0;
}
```

### 8-9

```cpp
istringstream& read_all(istringstream& in) {
    char c;
    while (!in.eof()) {
        in >> c;
        cout << c << endl;
    }
    in.clear();
    return in;
}
```

### 8-10

```cpp
int main(int argc, const char* argv[]) {
    using namespace std;
    ifstream fin(argv[1]);
    vector<string> lines;
    string s;
    while (fin >> s)
        lines.push_back(s);

    for (const auto& line : lines) {
        istringstream is(line);
        while (is >> s) {
            cout << s << endl;
        }
    }
    return 0;
}
```

## 第九章

### 9-1

(a) 使用 list 或者是 forward_list，因为可能需要频繁地中间插入

(b) 使用 deque 或者 list，因为需要两端的插入/删除

(c) 使用 vector，没有中间插入或者两端的插入/删除

### 9-2

```cpp
int main(int argc, const char* argv[]) {
    using namespace std;
    list<deque<int>> s;
}
```

### 9-3

end 不提前于 begin

### 9-4

```cpp
bool my_find(std::vector<int>::const_iterator begin,
             std::vector<int>::const_iterator end, int target) {
    while (begin != end) {
        if (*(begin++) == target)
            return true;
    }
    return false;
}
```

### 9-5

```cpp
std::vector<int>::const_iterator&
my_find(std::vector<int>::const_iterator& begin,
        std::vector<int>::const_iterator& end, int target) {
    while (begin != end) {
        if (*(begin++) == target)
            return begin;
    }
    return end;
}
```

### 9-6

应该修改为 `while(iter1 != iter2)`，list 的迭代器不支持随机访问

### 9-7

应该使用`vecotr<int>::size_type`

### 9-8

应该使用`string::reference`

### 9-9

begin 可能返回`iterator`或者`const_iterator`，cbegin 返回`const_iterator`

### 9-10

`it1`为`vector<int>::iterator`，`it2`,`it3`,`it4`为`vector<int>::const_iterator`

### 9-11

```cpp
int main() {
    using namespace std;
    vector<int> v1;
    vector<int> v2(10, 1);
    vector<int> v3{1, 2, 3, 4};
    vector<int> v4 = {1, 2, 3, 4};
    vector<int> v5 = v1;
    vector<int> v6(v1);
}
```

### 9-12

前者需要保证容器类型和元素类型都相同，后者只需要保证元素类型相同

### 9-13

```cpp
int main() {
    using namespace std;
    list<int> l = {1, 2, 3};
    vector<double> v(l.begin(), l.end());
}
```

### 9-14

```cpp
int main() {
    using namespace std;
    list<const char*> l = {"hello", "cattchen"};
    vector<string> v(l.begin(), l.end());
}
```

### 9-15

```cpp
int main() {
    using namespace std;
    vector<int> v1 = {1, 2, 3}, v2 = {1, 2, 3};
    cout << (v1 == v2 ? "equal" : "not equal") << endl;
}
```

### 9-17

c1 和 c2 的容器类型、元素类型相同，且元素类型支持比较运算符

### 9-18

```cpp
int main() {
    using namespace std;
    deque<string> d;
    string s;
    while (cin >> s)
        d.push_back(s);
    for (const auto& line : d) {
        cout << line << endl;
    }
}
```

### 9-19

```cpp
int main() {
    using namespace std;
  	// 修改容器类型即可
    list<string> d;
    string s;
    while (cin >> s)
        d.push_back(s);
    for (const auto& line : d) {
        cout << line << endl;
    }
}
```

### 9-20

```cpp
int main() {
    using namespace std;
    list<int> total = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    deque<int> odd, even;
    for (const auto& item : total) {
        if (item % 2 == 0) {
            even.push_back(item);
        } else {
            odd.push_back(item);
        }
    }
}
```

### 9-21

```cpp
int main() {
    using namespace std;
    list<string> lst;
    string word;
    auto iter = lst.begin();
    while (cin >> word)
        iter = lst.insert(iter, word);

    for (const auto& s : lst) {
        cout << s << endl;
    }
}
```

### 9-22

没有对 iter 进行自增，有死循环。while 循转中进行自增操作

### 9-24

```cpp
int main() {
    using namespace std;
    vector<int> v = {1, 2, 3};
    cout << v.at(0) << endl;
    cout << v[0] << endl;
    cout << v.front() << endl;
    cout << *v.begin() << endl;
}
```

### 9-25

elem1 和 elem2 相等，不发生删除

elem2 是尾后迭代器，删除 elem1 及之后的元素

### 9-26

```cpp
int main() {
    using namespace std;
    int ia[] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 55, 89};
    vector<int> v(begin(ia), end(ia));
    list<int> l(begin(ia), end(ia));
    for (auto it = v.begin(); it != v.end(); it++) {
        if (*it % 2 == 0) {
            it = v.erase(it);
        }
    }
    for (auto it = l.begin(); it != l.end(); it++) {
        if (*it % 2 != 0) {
            it = l.erase(it);
        }
    }
    return 0;
}
```

### 9-27

```cpp
int main() {
    using namespace std;
    forward_list<int> fl{1, 2, 3, 4, 5, 6, 7, 8, 9};
    for (auto it = fl.before_begin(); it != fl.end(); it++) {
        if (*next(it) % 2 != 0) {
            it = fl.erase_after(it);
        }
    }
    for (const auto n : fl) {
        cout << n << endl;
    }
    return 0;
}
```

### 9-28

```cpp
void insert_str(std::forward_list<std::string>& l, std::string& str1,
                std::string& str2) {
    for (auto it = l.before_begin(); it != l.end(); it++) {
        if (*next(it) == str1) {
            it = l.insert_after(it, str2);
            return;
        }
    }
}
```

### 9-29

先在尾部新增 75 个元素，然后删除后 90 个元素

### 9-30

元素需要提供默认构造函数

### 9-31

list 或者是 forward_list 的迭代器不支持运算符+

### 9-32

合法

### 9-33

vector 扩容时，可能发生底层数组的改变，导致原来的迭代器不可用

### 9-34

遇到奇数值后，不停地在奇数值前插入该数值，是个死循环

### 9-35

capacity 是 vector 底层数组的大小，size 是 vector 实际存放的元素的个数

### 9-36

不可能

### 9-37

list 是双向链表，没有对应的底层数组，array 对应的底层数据固定大小

### 9-38

以 2^n 的趋势扩张

```cpp
int main() {
    vector<int> vi;
    for (int i = 0; i < 3000; i++) {
        vi.push_back(1);
        cout << vi.size() << " " << vi.capacity() << endl;
    }
}
```

### 9-39

vector 预先扩容为 1024，读入字符串，结束输入后扩容为原来的 1.5 倍

### 9-41

```cpp
int main() {
    vector<char> vc = {'h', 'e', 'l', 'l', 'o'};
    string s(vc.begin(), vc.end());
    cout << s << endl;
}
```

### 9-42

使用 reserve 提前分配空间

### 9-43

```cpp
// 好像还有点问题
void my_replace(string& s, const string& old_val, const string& new_val) {
    string::iterator iter1, iter2;
    iter1 = s.begin();
    while (iter1 != s.end()) {
        while (*iter1 == ' ')
            iter1++;
        iter2 = iter1;
        while (iter2 != s.end() && *iter2 != ' ')
            iter2++;
        string sub(iter1, iter2);
        if (sub == old_val) {
            iter2 = s.erase(iter1, iter2);
            s.insert(iter2 - s.begin(), new_val);
        }
        iter1 = iter2;
    }
}

int main() {
    string s = "tho i thru";
    my_replace(s, "tho", "though");
    cout << s << endl;
}
```

### 9-44

//

### 9-45

```cpp
std::string generate_name(const std::string& name, const std::string& prefix) {
    std::string result = name;
    auto iter = result.begin();
    for (const auto& c : prefix) {
        iter = result.insert(iter, c) + 1;
    }
    return result;
}
```

### 9-46

```cpp
std::string generate_name(const std::string& name, const std::string& prefix) {
    std::string result = name;
    result.insert(0, prefix.c_str(), prefix.size());
    return result;
}
```

### 9-47

```cpp
int main() {
    string s("ab2c3d7R4E6"), numbers("0123456789");
    int pos = 0;
    cout << "search number" << endl;
    while ((pos = s.find_first_of(numbers, pos)) != string::npos) {
        cout << s[pos++] << endl;
    }
    cout << "search alpha" << endl;
    pos = 0;
    while ((pos = s.find_first_not_of(numbers, pos)) != string::npos) {
        cout << s[pos++] << endl;
    }
}
```

### 9-48

返回`string::npos`

### 9-49

```cpp
std::string longest_noender(const string& in) {
    auto it = in.begin();
    string result;
    string::const_iterator start = in.end(), end = in.end();
    while (it != in.end()) {
        switch (*it) {
        case 'd':
        case 'f':
        case 'p':
        case 'g':
        case 'b':
        case 'h':
        case 'i':
        case 'j':
        case 'k':
        case 'l':
        case 'q':
        case 't':
        case 'y':
            if (start != end) {
                string tmp(start, end);
                if (tmp.length() > result.length()) {
                    result = tmp;
                }
                start = it + 1;
                end = start;
            }
            break;
        default:
            if (start == end) {
                start = it;
                end = it + 1;
            } else {
                end = it + 1;
            }
        }
        it++;
    }
    return result;
}
```

### 9-50

```cpp
double str_sum(const vector<string>& s) {
    double sum;
    for (const auto& v : s) {
        sum += stold(v);
    }
    return sum;
}
```

### 9-51

```cpp
static unordered_map<string, unsigned int> map_months{
    {"January", 1},   {"February", 2}, {"March", 3},     {"April", 4},
    {"May", 5},       {"June", 6},     {"July", 7},      {"August", 8},
    {"September", 9}, {"October", 10}, {"November", 11}, {"December", 12},
};

static unordered_map<string, unsigned int> map_short_months{
    {"Jan", 1}, {"Feb", 2}, {"Mar", 3}, {"Apr", 4},  {"May", 5},  {"Jun", 6},
    {"Jul", 7}, {"Aug", 8}, {"Sep", 9}, {"Oct", 10}, {"Nov", 11}, {"Dec", 12}};

class MyDate {
  private:
    unsigned int year;
    unsigned int month;
    unsigned int day;

  public:
    MyDate(unsigned int year, unsigned int month, unsigned int day)
        : year(year), month(month), day(day) {}
    static MyDate from_str(const string& in) {
        vector<string> values;
        vector<char> seperators;
        auto it = in.begin();
        auto beg = in.end(), end = in.end();
        while (it != in.end()) {
            switch (*it) {
            case ' ':
            case ',':
            case '/':
                seperators.push_back(*it);
                values.emplace_back(beg, end);
                beg = it + 1;
                end = beg;
                break;
            default:
                if (beg == end) {
                    beg = it;
                }
                end = it + 1;
            }
            it++;
        }
        if (beg != end) {
            values.emplace_back(beg, end);
        }
        if (seperators[0] == ' ' && seperators[1] == ',') {
            return {(unsigned int)(stoul(values[2])),
                    (unsigned int)(stoul(values[1])), map_months[values[0]]};
        } else if (seperators[0] == '/' && seperators[1] == '/') {
            return {(unsigned int)(stoul(values[2])),
                    (unsigned int)(stoul(values[1])),
                    (unsigned int)(stoul(values[0]))};
        } else if (seperators[0] == ' ' && seperators[1] == ' ') {
            return {(unsigned int)(stoul(values[2])),
                    (unsigned int)(stoul(values[1])),
                    map_short_months.at(values[0])};
        }
        throw new runtime_error("unexpeted date string");
    };
    friend ostream& operator<<(ostream& out, const MyDate& date) {
        out << "year: " << date.year << ", month: " << date.month
            << ", day: " << date.day;
        return out;
    }
};
```

### 9-52

```cpp
int calc_expr(const string& expr) {
    stack<string> t;
    int result;
    auto it = expr.begin();
    auto beg = expr.begin(), end = expr.begin();
    while (it != expr.end()) {
        if (*it >= '0' && *it <= '9') {
            if (beg == end) {
                beg = it;
                end = it + 1;
            } else {
                end = it + 1;
            }
        } else if (*it != ' ') {
            if (beg != end) {
                t.emplace(beg, end);
                beg = it + 1;
                end = beg;
            }
            if (*it == ')') {

            } else {
                t.emplace(1, *it);
            }
        }
        it++;
    }
    if (beg != end) {
        // TODO
        // t.emplace(beg, end);
    }
    while (!t.empty()) {
        cout << t.top() << endl;
        t.pop();
    }
    return result;
}
```

## 第十章

### 10-1

```cpp
int main() {
    vector<int> v = {1, 2, 3, 4, 5, 2};
    int count = ::count(v.begin(), v.end(), 2);
    cout << count << endl;
}
```

### 10-2

```cpp
int main() {
    vector<string> v = {"hello", "hola", "hello"};
    int count = ::count(v.begin(), v.end(), "hello");
    cout << count << endl;
}
```

### 10-3

```cpp
int main() {
    vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << sum << endl;
}
```

### 10-4

精度丢失问题，改为`accmulate(v.cbegin(),v.cend(),0.0)`

### 10-5

也是可以执行，我理解是直接比较了`const char*`的地址

### 10-6

```cpp
int main() {
    vector<int> v;
    v.resize(10);
    fill_n(v.begin(), 10, 0);
    for (const auto& n : v) {
        cout << n << endl;
    }
}
```

### 10-7

(a) 修改为`copy(lst.cbegin(), lst.cend(), back_inserter(vec));` 泛型算法并不会去执行容器操作

(b) 修改为`vec.resize(10);` 泛型算法不会修改容器的 size

### 10-9

```cpp
void elim_dups(std::vector<string>& words) {
    sort(words.begin(), words.end());
    auto it = unique(words.begin(), words.end());
    words.erase(it, words.end());
}

int main() {
    std::vector<string> words = {"fox", "jumps", "over", "quick",
                                 "red", "slow",  "the",  "turtle"};
    elim_dups(words);
    for (const auto& s : words) {
        cout << s << endl;
    }
}
```

### 10-11

```cpp
bool is_shorter(const string& s1, const string& s2) {
    return s1.size() < s2.size();
}

void elim_dups(std::vector<string>& words) {
    stable_sort(words.begin(), words.end(), is_shorter);
    auto it = unique(words.begin(), words.end());
    words.erase(it, words.end());
}

int main() {
    std::vector<string> words = {"fox", "jumps", "over", "quick",
                                 "red", "slow",  "the",  "turtle"};
    elim_dups(words);
    for (const auto& s : words) {
        cout << s << endl;
    }
}
```

### 10-13

```cpp
bool is_longer_then_5(const string& s) { return s.size() >= 5; }

int main() {
    //
    vector<string> v{"fox", "jumps", "over", "quick",
                     "red", "slow",  "the",  "turtle"};
    auto it = partition(v.begin(), v.end(), is_longer_then_5);
    v.erase(it, v.end());
    for (const auto& s : v) {
        cout << s << endl;
    }
}
```

### 10-14

```cpp
int main() {
    auto my_max = [](int a, int b) -> int { return a > b ? a : b; };
    cout << my_max(2, 3) << endl;
}
```

### 10-15

```cpp
int main() {
    auto create_adder = [](int a) -> std::function<int(int)> {
        return [a](int b) -> int { return a + b; };
    };
    auto adder = create_adder(1);
    cout << adder(3) << endl;
}
```

### 10-16

```cpp
int main() {
    auto biggies = [](vector<string>& words, vector<string>::size_type sz) {
        sort(words.begin(), words.end());
        auto it = unique(words.begin(), words.end());
        words.erase(it, words.end());
        stable_sort(words.begin(), words.end(),
                    [](const string& a, const string& b) {
                        return a.size() < b.size();
                    });
        auto wc = find_if(words.begin(), words.end(),
                          [sz](const string& a) { return a.size() >= sz; });
        auto count = words.end() - wc;
        cout << count << endl;
    };
    vector<string> words{"fox", "jumps", "over", "quick",
                         "red", "slow",  "the",  "turtle"};
    biggies(words, 5);
}
```

### 10-20

```cpp
int main() {
    vector<string> words{"fox",       "jumps", "over", "quick",
                         "redredred", "slow",  "the",  "turtle"};
    auto c = count_if(words.begin(), words.end(),
                      [](const string& s) -> bool { return s.size() > 6; });
    cout << c << endl;
}
```

### 10-21

```cpp
int main() {
    int i = 5;
    auto dec = [&i]() {
        if (i <= 0)
            return false;
        i--;
        return true;
    };
    while (dec()) {
        cout << i << endl;
    }
}
```

### 10-22

```cpp
int main() {
    vector<string> words{"fox",       "jumps", "over", "quick",
                         "redredred", "slow",  "the",  "turtle"};
    auto count_size = [](const vector<string>& v,
                         const vector<string>::size_type size) -> int {
        return count_if(v.begin(), v.end(), [size](const string& s) -> bool {
            return s.size() >= size;
        });
    };
    auto count_size_5 = bind(count_size, placeholders::_1, 5);
    cout << count_size_5(words) << endl;
}
```

### 10-23

29 个参数

### 10-24

```cpp
int main() {
    vector<int> sizes{1, 2, 3, 4, 5, 6, 7, 8};
    string s("helo");
    auto it = find_if(sizes.begin(), sizes.end(),
                      [&s](int size) -> bool { return size > s.size(); });
    cout << (it == sizes.end() ? "not found" : ::to_string(*it)) << endl;
}
```

### 10-26

对迭代器进行复制时，进行的容器操作不同`push_front`,`push_back`,`insert`

### 10-27

```cpp
int main() {
    vector<int> sizes{1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6}, result;
    unique_copy(sizes.begin(), sizes.end(), back_inserter(result));
    for (const auto& n : result) {
        cout << n << endl;
    }
}
```

### 10-28

```cpp
int main() {
    vector<int> sizes{1, 2, 3, 4, 5, 6, 7, 8, 9};
    deque<int> result1, result2, result3;
    copy(sizes.begin(), sizes.end(), inserter(result1, result1.begin()));
    copy(sizes.begin(), sizes.end(), back_inserter(result2));
    copy(sizes.begin(), sizes.end(), front_inserter(result3));
    cout << "result 1:" << endl;
    for (const auto& n : result1) {
        cout << n << endl;
    }
    cout << "result 2:" << endl;
    for (const auto& n : result2) {
        cout << n << endl;
    }
    cout << "result 3:" << endl;
    for (const auto& n : result3) {
        cout << n << endl;
    }
}
```

### 10-29

```cpp
int main() {
    auto ifs = ifstream("in.txt", ios_base::in);
    vector<string> res{};
    istream_iterator<string> isi(ifs), eof;

    while (isi != eof) {
        res.emplace_back(*(isi++));
    }

    for (const auto& n : res) {
        cout << n << endl;
    }
}
```

### 10-30

```cpp
int main() {
    istream_iterator<int> in_iter(cin), eof;
    vector<int> result{};
    copy(in_iter, eof, back_inserter(result));
    sort(result.begin(), result.end());
    for (const auto& n : result) {
        cout << n << endl;
    }
}
```

### 10-31

```cpp
int main() {
    istream_iterator<int> in_iter(cin), eof;
    vector<int> result{};
    unique_copy(in_iter, eof, back_inserter(result));
    sort(result.begin(), result.end());
    for (const auto& n : result) {
        cout << n << endl;
    }
}
```

### 10-33

```cpp
int main(int argc, const char** argv) {
    if (argc < 4) {
        cerr << "args not enough" << endl;
        return -1;
    }
    auto inf = ifstream(argv[1], ios_base::in);
    auto outf1 = ofstream(argv[2], ios_base::trunc | ios_base::out);
    auto outf2 = ofstream(argv[3], ios_base::trunc | ios_base::out);
    istream_iterator<int> isi(inf), eof;
    ostream_iterator<int> osi1(outf1, " "), osi2(outf2, " ");

    partition_copy(isi, eof, osi1, osi2,
                   [](int x) -> bool { return x % 2 == 0; });
}
```

### 10-.34

```cpp
int main() {
    vector<int> v{1, 2, 3, 4, 5};
    for (auto it = v.rbegin(); it != v.rend(); it++) {
        cout << *it << endl;
    }
    return 0;
}
```

### 10-35

```cpp
int main() {
    vector<int> v{1, 2, 3, 4, 5};
    auto it = v.end();
    do {
        it--;
        cout << *it << endl;
    } while (it != v.begin());
    return 0;
}
```

### 10-36

```cpp
int main() {
    vector<int> v{1, 2, 3, 0, 4, 0, 5};
    auto it = find(v.rbegin(), v.rend(), 0);
    cout << *(it + 1) << " " << *it << " " << *(it - 1) << endl;
    return 0;
}
```

### 10-37

```cpp
int main() {
    vector<int> v{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    list<int> l;
    copy(v.rbegin() + 3, v.rbegin() + 7, back_inserter(l));
    for (const auto& n : l) {
        cout << n << endl;
    }
    return 0;
}
```

### 10-39

list 上的迭代器属于双向迭代器，vector 上的迭代器属于随机访问迭代器

## 第十一章

### 11-3

```cpp
int main() {
    unordered_map<string, unsigned int> counter;
    vector<string> words{"The", "But", "And", "Or", "An", "A",
                         "The", "But", "And", "or", "an", "a"};
    for (const auto& word : words) {
        counter[word]++;
    }
    for (const auto& pair : counter) {
        cout << pair.first << " -> " << pair.second << endl;
    }
}
```

### 11-4

```cpp
int main() {
    unordered_map<string, unsigned int> counter;
    vector<string> words{"The", "But", "And", "Or", "An", "A",
                         "The", "But", "And", "or", "an", "a"};
    for (const auto& word : words) {
        string key;
        transform(word.begin(), word.end(), back_inserter(key),
                  [](unsigned char c) { return tolower(c); });
        counter[key]++;
    }
    for (const auto& pair : counter) {
        cout << pair.first << " -> " << pair.second << endl;
    }
}
```

### 11-9

```cpp
int main() {
    map<string, list<unsigned int>> m;
    return 0;
}
```

### 11-10

前者可以，后者不行，因为 list\<int>::iterator 没有实现<=运算符

### 11-15

mapped_type 为 vector\<int>,key_type 为 int,value_type 为 pair<int,vector\<int>>

### 11-16

```cpp
int main() {
    map<int, int> m{{1, 2}};
    auto it = m.begin();
    it->second = 3;
    for (const auto& pair : m) {
        cout << pair.first << " " << pair.second << endl;
    }
    return 0;
}
```

### 11-17

1. 合法
2. 不合法，multiset 上没有`push_back`的方法
3. 合法
4. 合法

### 11-28

```cpp
int main() {
    map<string, vector<int>> m{{"a", {1, 2, 3, 4}}, {"b", {5, 6, 7, 8}}};
    auto it = m.find("a");
    for (const auto& item : it->second) {
        cout << item << endl;
    }
}
```

### 11-29

前两者返回 end,后者返回 pair{end,end}

### 11-33

```cpp
#include <fstream>
#include <ios>
#include <iostream>
#include <map>
#include <sstream>
#include <string>

using namespace std;

int main() {
    ifstream dict_if("./1.txt", ios_base::in), text_if("./2.txt", ios_base::in);
    map<string, string> dict;
    string tmp;
    stringstream result_ss;
    while (getline(dict_if, tmp)) {
        auto it = tmp.find(' ');
        dict.insert({tmp.substr(0, it), tmp.substr(it + 1)});
    }
    while (text_if >> tmp) {
        if (dict.find(tmp) != dict.end()) {
            tmp = dict[tmp];
        }
        result_ss << tmp << " ";
    }
    cout << result_ss.str() << endl;
}
```

### 11-34

下标会在 key_type 不存在时，自动创建，find 不会

### 11-35

insert 不会生效，因为相同的 key_type 已经存在
