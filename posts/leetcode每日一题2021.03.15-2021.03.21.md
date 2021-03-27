---
title: leetcode每日一题2021.03.15-2021.03.21
date: 2021-03-27 19:57:44
tags: ["leetcode"]
---

# 2021.03.15 螺旋矩阵

[https://leetcode-cn.com/problems/spiral-matrix/](https://leetcode-cn.com/problems/spiral-matrix/)

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const result = [];
  let i = 0,
    j = 0;
  while (true) {
    while (matrix[i][j + 1] !== undefined) {
      result.push(matrix[i][j]);
      matrix[i][j] = undefined;
      j += 1;
    }
    while (matrix[i + 1] !== undefined && matrix[i + 1][j] !== undefined) {
      result.push(matrix[i][j]);
      matrix[i][j] = undefined;
      i += 1;
    }
    while (matrix[i][j - 1] !== undefined) {
      result.push(matrix[i][j]);
      matrix[i][j] = undefined;
      j -= 1;
    }
    while (matrix[i - 1] !== undefined && matrix[i - 1][j] !== undefined) {
      result.push(matrix[i][j]);
      matrix[i][j] = undefined;
      i -= 1;
    }
    if (
      matrix[i][j + 1] === undefined &&
      (matrix[i + 1] === undefined || matrix[i + 1][j] === undefined) &&
      matrix[i][j - 1] === undefined &&
      (matrix[i - 1] === undefined || matrix[i - 1][j] === undefined)
    ) {
      result.push(matrix[i][j]);
      break;
    }
  }
  return result;
};
```

# 2021.03.16 螺旋矩阵 II

[https://leetcode-cn.com/problems/spiral-matrix-ii/](https://leetcode-cn.com/problems/spiral-matrix-ii/)

```javascript
/**
 * 时间复杂度O(n2)
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const matrix = Array.from({ length: n }).map(() => Array.from({ length: n }));
  let index = 1;
  for (let i = 0; i < n >> 1; i++) {
    for (let j = i; j < n - i - 1; j++) {
      matrix[i][j] = index++;
    }
    for (let j = i; j < n - i - 1; j++) {
      matrix[j][n - 1 - i] = index++;
    }
    for (let j = i; j < n - i - 1; j++) {
      matrix[n - 1 - i][n - 1 - j] = index++;
    }
    for (let j = i; j < n - i - 1; j++) {
      matrix[n - 1 - j][i] = index++;
    }
  }
  if (n % 2 === 1) {
    const pos = n >> 1;
    matrix[pos][pos] = index;
  }
  return matrix;
};
```

# 2021.03.17 不同的子序列

[https://leetcode-cn.com/problems/distinct-subsequences/](https://leetcode-cn.com/problems/distinct-subsequences/)

对`s` 和`t`进行逐字比对时，如果`s[i]`和`t[j]`相等，则有可能当前的`s[i]`可以作为`t[j]` ，需要进一步匹配`s[i-n]`(n>0)和`t[j-1]`，同时还应该考虑可能存在`s[i-n]`(n>0)可以匹配上`t[j]`。

```javascript
/**
 * 递归解法 容易栈溢出
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const dp = (p1, p2) => {
    if (p2 < 0) return 1;
    if (p1 < 0) return 0;
    if (s[p1] === t[p2]) {
      return dp(p1 - 1, p2 - 1) + dp(p1 - 1, p2);
    } else {
      return dp(p1 - 1, p2);
    }
  };
  return dp(s.length - 1, t.length - 1);
};

/**
 * 动态规划
 * 时间复杂度O(mn)
 * 空间复杂度O(mn)
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const dp = Array.from({ length: s.length + 1 }).map(() =>
    Array.from({ length: t.length + 1 }).map(() => 0)
  );
  for (let i = 0; i <= t.length; i++) {
    dp[0][i] = 0;
  }
  for (let i = 0; i <= s.length; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[s.length][t.length];
};

/**
 * 动态规划
 * 时间复杂度O(mn)
 * 空间复杂度O(n)
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const dp = Array.from({ length: t.length + 1 }).map(() => 0);
  dp[0] = 1;
  for (let i = 1; i <= t.length; i++) {
    dp[i] = 0;
  }
  for (let i = 1; i <= s.length; i++) {
    const nextDp = Array.from({ length: t.length + 1 }).map(() => 0);
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        nextDp[j] = dp[j - 1] + dp[j];
      } else {
        nextDp[j] = dp[j];
      }
    }
    for (let j = 1; j < nextDp.length; j++) {
      dp[j] = nextDp[j];
    }
  }
  return dp[t.length];
};
```

# 2021.03.18 反转链表 II

[https://leetcode-cn.com/problems/reverse-linked-list-ii/](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

```javascript
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  const origin = new ListNode(0, head);
  let p1 = origin,
    p2 = head;
  while (--m) {
    p1 = p1.next;
  }
  while (--n) {
    p2 = p2.next;
  }
  const p3 = p2.next;
  p2.next = null;
  let prev = null;
  let current = p1.next;
  while (current) {
    const tmp = current.next;
    current.next = prev;
    prev = current;
    current = tmp;
  }
  p1.next = prev;
  while (p2 && p2.next) {
    p2 = p2.next;
  }
  p2.next = p3;
  return origin.next;
};
```

# 2021.03.19 设计停车系统

[https://leetcode-cn.com/problems/design-parking-system/](https://leetcode-cn.com/problems/design-parking-system/)

```javascript
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
  this._cap = [0, big, medium, small];
};

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
  if (!this._cap[carType]) {
    return false;
  } else {
    this._cap[carType] -= 1;
    return true;
  }
};
```

# 2021.03.20 逆波兰表达式求值

[https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

```javascript
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];
  const operators = ["+", "-", "*", "/"];
  for (const token of tokens) {
    stack.push(token);
    while (operators.includes(stack[stack.length - 1])) {
      const operator = stack.pop();
      const operand1 = parseInt(stack.pop());
      const operand2 = parseInt(stack.pop());
      switch (operator) {
        case "+":
          stack.push(operand1 + operand2);
          break;
        case "-":
          stack.push(operand2 - operand1);
          break;
        case "*":
          stack.push(operand1 * operand2);
          break;
        case "/":
          stack.push(~~(operand2 / operand1));
          break;
      }
    }
  }
  return stack[0];
};
```

# 2021.03.21 矩阵置零

[https://leetcode-cn.com/problems/set-matrix-zeroes/](https://leetcode-cn.com/problems/set-matrix-zeroes/)

```javascript
/**
 * 时间复杂度 O(mn)
 * 空间复杂度 O(m+n)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const ys = Array.from({ length: matrix.length }).map(() => false);
  const xs = Array.from({ length: matrix[0].length }).map(() => false);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][k] === 0) {
        ys[i] = true;
        xs[j] = true;
      }
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (ys[i] || xs[j]) {
        matrix[i][j] = 0;
      }
    }
  }
};

/**
 * 时间复杂度O(mn)
 * 空间复杂度O(1)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let firstColHasZero = false,
    firstRowHasZero = false;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      firstRowHasZero = true;
      break;
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[0][j] === 0 || matrix[i][0] === 0) {
        matrix[i][j] = 0;
      }
    }
  }
  if (firstColHasZero) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = 0;
    }
  }
  if (firstRowHasZero) {
    for (let i = 0; i < matrix[0].length; i++) {
      matrix[0][i] = 0;
    }
  }
};
```
