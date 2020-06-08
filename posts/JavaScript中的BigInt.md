---
title: JavaScript中的BigInt
date: 2020-04-11 18:55:59
tags: ["JavaScript"]
index_img: ../assets/Gbtt2R.png
---

## JavaScript 中的 BigInt

之前写 JavaScript 代码，有听说到`Number.MAX_VALUE`和`Number.MAX_SAFE_INTEGER`，但是一直没有做深入的理解，对`Number.MAX_SAFE_INTEGER`并不太了解。

### 遇到的问题

要从一个密码学实验代码说起，最近在用 JavaScript 实现 RSA 算法，遇到了一个问题。RSA 算法是基于大质数乘积的因式分解困难的难题实现的。

其中，生成密钥对的大致步骤如下：

1. 随机生成两个大质数 p,q;
2. 计算 n=p\*q;
3. 计算 m=(p-1)\*(q-1);
4. 计算数值 e，e 为一个与 m 互质的数
5. 计算数值 d，d 为满足`(d*e) ≡ 1 mod m` 的数

在生成`d`时遇到了一个问题，`generateD()`生成的`d`不符合我的预期，但是计算步骤是没问题的。

```javascript
const generateD = (e, m) => {
  let k = 1;
  while (true) {
    if ((k * m + 1) % e === 0) {
      return (k * m + 1) / e;
    }
    k++;
  }
};
```

排查发现当 k=`5`,m=`9999999999999999`,e=`10`时，if 的条件语句为真，但是从数学的角度来说，此时`(k*m+1)%e`显然是 6。

```javascript
console.log((5 * 9999999999999999 + 1) % 10);
// 结果为0
```

怀疑是数值太大的原因改用 BigInt，才解决了问题。

```javascript
console.log((5n * 9999999999999999n + 1n) % 10n);
// 结果为6n
```

重新修改`generateD`函数

```javascript
const generateD = (e, m) => {
  let k = 1n;
  e = BigInt(e);
  m = BigInt(m);
  while (true) {
    if ((k * m + 1n) % e === 0n) {
      return parseInt((k * m + 1n) / e);
    }
    k++;
  }
};
```

### 原因分析

原因在于 JavaScript 中的`Number`无论是整数还是小数都是使用 IEEE754 的双精度浮点数表示的。

![双精度浮点数](https://s1.ax1x.com/2020/04/11/GbPPij.png)

双精度浮点数的表示类似与科学计数法`(-1)^S*(1.M)*2^(E-1023)`

由符号位（d63），指数部分（d62-d52），尾数部分（d51-d0）组成。符号位决定了这个浮点数的正负，指数部分决定了这个数的表示范围，尾数部分决定了这个数的表示精度。如果尾数部分太长，那么多余的部分只能舍去，此时浮点数的精度就降低了。

![Float Point Converter](https://s1.ax1x.com/2020/04/11/Gbtt2R.png)

因此有了`Number.MAX_SAFE_INTEGER`。它的值为`9007199254740991`[<sup>1</sup>](#refer-1)， 当数值超过`Number.MAX_SAFE_INTEGER`时，就不能保证数值的精度了。可以调用`Number.isSafeInteger`进行判断。

> Number.MAX_SAFE_VALUE[<sup>[2]</sup>](#refer-2) : The value of `Number.MAX_SAFE_INTEGER` is the largest integer n such that n and n + 1 are both exactly representable as a Number value.

### BigInt

我们可以用 BigInt 来表示任意大的整数，但也有需要注意的地方

1. 不可以和 Number 实例混用
2. 不能用于 Math 对象中的方法
3. 使用 BigInt 运算时，带小数的结果会被取整
4. 在 JSON 中使用时，需要自己实现`BigInt.prototype.toJSON`
5. 因为对 BigInt 的操作并不是常数时间，因此 BigInt 不适合用于密码学[<sup>[3]</sup>](#refer-3)

### 参考引用

- [1] https://www.binaryconvert.com/result_double.html?decimal=057048048055049057057050053052055052048057057049

- [2] https://www.ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer/

- [3] https://www.chosenplaintext.ca/articles/beginners-guide-constant-time-cryptography.html
