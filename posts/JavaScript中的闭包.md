---
title: JavaScript中的闭包
date: 2019-07-22 15:35:59
tags:
  - JavaScript
---

## 一道题目

这是 ScriptOJ 上的一道题目 => [传送门](http://scriptoj.mangojuice.top/problems/102)
`记忆化斐波那契函数（Memoization）`
题目是这样的

> **斐波那契数列**指的是类似于以下的数列：
>
> 1, 1, 2, 3, 5, 8, 13, ....
> 也就是，第 n 个数由数列的前两个相加而来：**f(n) = f(n - 1) + f(n -2)**
> 请你完成 fibonacci 函数，接受 n 作为参数，可以获取数列中第 n 个数，例如：
>
> fibonacci(3) // => 2
>
> fibonacci(2) // => 1
>
> fibonacci(3) // => 2
>
> ...
>
> 测试程序会从按顺序依次获取斐波那契数列中的数，请注意程序不要超时，也不要添加额外的全局变量。

### 常规做法

一般来说，斐波那契数列，我们会选择使用递归函数来解决，正如题目中所给的那样 `f(n)=f(n-1)+f(n-2)` 我们只要当 n 小于 2 时返回 1 就可以了。
用 JavaScript 处理后就是这样

```JavaScript
const fibonacci = n => n > 2 ? fibonacci(n-1) + fibonacci(n-2) : 1;
for(let i = 1 ;i < 7;i++) console.log(fibonacci(i))
/**
 * 运行结果：
 * 1
 * 1
 * 2
 * 3
 * 5
 * 8
 */
```

这样处理对程序员来说确实比较轻松，几乎不用写什么逻辑，但缺点也很明显，这样递归占用空间较大，效率较低，容易超时。

### 使用 JavaScript 的闭包

我们可以看出一个很明显的特点，题目所给的数据是从 1 依次递增的，因此如果我们可以将前两次的数据存储下来，无疑可以减少很多不必要的计算量。

```javascript
const fibonacci = (() => {
  const temp = [1, 1];
  return function (n) {
    if (n === 1 || n === 2) return 1;
    const result = temp[n - 2] + temp[n - 3];
    temp.push(result);
    return result;
  };
})();
```

运行结果如下：

```javascript
for (let i = 1; i < 9; i++) {
  console.log(fibonacci(i));
}
/**
1
1
2
3
5
8
13
21
*/
```

并且使用闭包后能通过测试了。甚至我们还可以继续压缩代码，变成只剩一行代码。~~看起来真得很爽，强迫症~~

```javascript
const fibonacci = (temp => n =>
  n === 1 || n === 2 ? 1 : (temp[n - 1] = temp[n - 2] + temp[n - 3]))([1, 1]);
```

使用闭包后，变量`fibonacci`不仅是个函数，并且是另一个函数的返回值，`temp`是另一个函数中的局部变量，同时，`fibonacci`又依赖于变量`temp`，因此虽然`temp`已经超出它的作用域了，但是`temp`并没有被垃圾回收机制（garbage collection）回收。同时，对于每一处调用的`fibonacci`对应的都是同一个`temp`。这样就可以对每次的结果进行记录。
