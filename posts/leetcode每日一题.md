---
title: leetcode每日一题
date: 2021-04-05 11:04:07
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

# 2021.03.22 位 1 的个数

[https://leetcode-cn.com/problems/number-of-1-bits/](https://leetcode-cn.com/problems/number-of-1-bits/)

```javascript
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    if (n & 1) {
      count += 1;
    }
    n = n >>> 1;
  }
  return count;
};
```

# 2021.03.23 扁平化嵌套列表迭代器

[https://leetcode-cn.com/problems/flatten-nested-list-iterator/](https://leetcode-cn.com/problems/flatten-nested-list-iterator/)

有点奇怪，本次跑测试用例通了，但是 oj 上过不了

```javascript
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function (nestedList) {
  this._list = nestedList;
  this._indexs = [0];
  while (Array.isArray(index(this._list, this._indexs))) {
    this._indexs.push(0);
  }
};

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function () {
  return index(this._list, this._indexs) !== undefined;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function () {
  const value = index(this._list, this._indexs);
  if (value !== undefined) {
    this._indexs[this._indexs.length - 1] += 1;
    let nextValue;
    while (this._indexs[0] < this._list.length) {
      nextValue = index(this._list, this._indexs);
      if (Array.isArray(nextValue)) {
        this._indexs.push(0);
      } else if (nextValue === undefined) {
        this._indexs.pop();
        this._indexs[this._indexs.length - 1] += 1;
      } else {
        break;
      }
    }
  }
  return value;
};

/**
 * @param {number[]} arr
 * @param {number[]} indexs
 */
function index(arr, indexs) {
  return indexs.reduce((prev, current) => prev[current], arr);
}
```

# 2021.03.24 132 模式

[https://leetcode-cn.com/problems/132-pattern/](https://leetcode-cn.com/problems/132-pattern/)

从右往左遍历 i，j 和 k 的空间逐渐增大。如果可以让 j 和 k 分别成为 i 右侧空间按顺序的第一大的数和第二大的数，只需要让 i 小于 k 就可以做到 132 模式。

使用一个从栈底到栈顶递减的单调栈，可以保证每一个被入栈的数，从 i 到这个数之间一定存在比这个数大的数，即栈中的每个数一定可以作为 k。

每次遍历时，维护一个单调栈，一个 maxK，首先判断这个数能否作为 i，即 i 比 maxK 小。否则考虑将这个数作为 j，此时就需要考虑一件事，更新 j 之后，可能导致之前的 maxK 不再是 i 右侧空间的第二大的数，需要不断的弹出，找到旧的 maxK 右侧更可能成为 maxK 的数。

```javascript
/**
 * 空间复杂度O(n)
 * 时间复杂度O(n)
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  const stack = [];
  let maxK = -Infinity;
  stack.push(nums[nums.length - 1]);
  for (let i = nums.length - 2; i >= 0; i--) {
    const current = nums[i];
    if (current < maxK) {
      return true;
    }
    while (stack.length && current > stack[stack.length - 1]) {
      maxK = stack.pop();
    }
    stack.push(current);
  }
  return false;
};
```

# 2021.03.25 删除排序链表中的重复元素 II

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const p = new ListNode(0, head);
  let current = p;
  while (current && current.next) {
    if (current.next.next && current.next.val === current.next.next.val) {
      const value = current.next.val;
      while (current.next && current.next.val === value) {
        current.next = current.next.next;
      }
    } else {
      current = current.next;
    }
  }
  return p.next;
};
```

# 2021.03.26 删除排序链表中的重复元素

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    while (p.next && p.val === p.next.val) {
      p.next = p.next.next;
    }
    p = p.next;
  }
  return head;
};
```

# 2021.03.27 旋转链表

[https://leetcode-cn.com/problems/rotate-list/](https://leetcode-cn.com/problems/rotate-list/)

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  let p0 = head,
    len = 0;
  while (p0) {
    p0 = p0.next;
    len += 1;
  }
  k = k % len;
  if (k === 0 || !head || !head.next) {
    return head;
  }
  let p1 = head,
    p2 = head;
  while (k-- >= 0) {
    p2 = p2.next;
  }
  while (p2) {
    p2 = p2.next;
    p1 = p1.next;
  }
  const newHead = p1.next;
  p1.next = null;
  p2 = newHead;
  while (p2 && p2.next) {
    p2 = p2.next;
  }
  p2.next = head;
  return newHead;
};
```

# 2021.03.28 二叉搜索树迭代器

[https://leetcode-cn.com/problems/binary-search-tree-iterator/](https://leetcode-cn.com/problems/binary-search-tree-iterator/)

```javascript
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this._queue = [];
  const stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    this._queue.push(root);
    root = root.right;
  }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this._queue.shift().val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return !!this._queue.length;
};
```

# 2021.03.29 颠倒二进制位

[https://leetcode-cn.com/problems/reverse-bits/](https://leetcode-cn.com/problems/reverse-bits/)

```rust
impl Solution {
    pub fn reverse_bits(x: u32) -> u32 {
        let mut res = 0_u32;
        let mut mut_x = x;
        for _ in 0..31 {
            res += mut_x & 1;
            res = res << 1;
            mut_x = mut_x >> 1;
        }
        res += mut_x & 1;
        res
    }
}

// 调用API 一行搞定
impl Solution {
		pub fn reverse_bits(x: u32) -> u32 {
				x.reverse_bits();
		}
}
```

# 2021.03.30 搜索二维矩阵

[https://leetcode-cn.com/problems/search-a-2d-matrix/](https://leetcode-cn.com/problems/search-a-2d-matrix/)

```javascript
/**
 * 从右上角进行遍历
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let i = 0,
    j = matrix[0].length - 1;
  while (i >= 0 && j >= 0 && i < matrix.length && j < matrix[0].length) {
    const current = matrix[i][j];
    if (current === target) {
      return true;
    } else if (current > target) {
      j--;
    } else {
      i++;
    }
  }
  return false;
};
```

```rust
impl Solution {
    pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
        let mut i = 0_i32;
        let mut j = (matrix[0].len() - 1) as i32;
        while i >= 0 && j >= 0 && i < matrix.len() as i32 && j < matrix[0].len() as i32 {
            let &current = &matrix[i as usize][j as usize];
            if current == target {
                return true;
            } else if current > target {
                j -= 1;
            } else {
                i += 1;
            }
        }
        false
    }
}
```

# 2021.03.31 子集 II

[https://leetcode-cn.com/problems/subsets-ii/](https://leetcode-cn.com/problems/subsets-ii/)

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  /**
   * @param {number[]} path
   * @param {number[]} options
   */
  const dfs = (path, options) => {
    if (result.every(one => !arrayComp(one, path))) {
      result.push(Array.from(path));
    }
    for (let i = 0; i < options.length; i++) {
      const copyOptions = options.slice(i);
      const [current] = copyOptions.splice(0, 1);
      path.push(current);
      dfs(path, copyOptions);
      path.pop();
    }
  };
  dfs([], nums);
  return result;
};

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function arrayComp(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
```

```rust
impl Solution {
    pub fn subsets_with_dup(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut copy_nums = nums;
        copy_nums.sort_by(|a, b| a.cmp(b));
        let mut result = vec![vec![]];
        let mut path = vec![];
        Solution::dfs(&mut result, &mut path, &mut copy_nums);
        result
    }
    fn dfs(result: &mut Vec<Vec<i32>>, path: &mut Vec<i32>, options: &mut Vec<i32>) {
        if result.iter().all(|one| one != path) {
            result.push(path.clone());
        }
        for i in 0..options.len() {
            let mut next_options = options.clone();
            let current = next_options.get(i).unwrap().clone();
            next_options.splice(..(i + 1), 0..0);
            path.push(current);
            Solution::dfs(result, path, &mut next_options);
            path.pop();
        }
    }
}
```

# 2021.04.01 笨阶乘

[https://leetcode-cn.com/problems/clumsy-factorial/](https://leetcode-cn.com/problems/clumsy-factorial/)

```javascript
/**
 * 直接模拟一遍
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 * @param {number} N
 * @return {number}
 */
var clumsy = function (N) {
  let res = 0,
    tmp = 0;
  for (let i = 0; i < N; i++) {
    const current = N - i;
    switch (i % 4) {
      case 0:
        tmp = i === 0 ? current : -current;
        break;
      case 1:
        tmp *= current;
        break;
      case 2:
        tmp = ~~(tmp / current);
        break;
      case 3:
        res += tmp;
        res += current;
        tmp = 0;
    }
  }
  return res + tmp;
};
```

```rust
impl Solution {
    pub fn clumsy(n: i32) -> i32 {
        let mut res = 0;
        let mut tmp = 0;
        for i in 0..n {
            let current = n - i;
            match i % 4 {
                0 => {
                    tmp = if i == 0 { current } else { -current };
                }
                1 => {
                    tmp *= current;
                }
                2 => {
                    tmp /= current;
                }
                3 => {
                    res += tmp;
                    res += current;
                    tmp = 0;
                }
                _ => {}
            }
        }
        res + tmp
    }
}
```

# 2021.04.02 直方图的水量

[https://leetcode-cn.com/problems/volume-of-histogram-lcci/](https://leetcode-cn.com/problems/volume-of-histogram-lcci/)

```javascript
/**
 * 单调栈
 * @param {number[]} height
 * @return {number}
 */
var trap = function (heights) {
  const stack = [];
  const caps = [];
  let result = 0;
  for (const height of heights) {
    while (stack[stack.length - 1] < height) {
      const capIndex = stack.pop();
      for (let i = capIndex; i < height; i++) {
        result += caps[i] || 0;
        caps[i] = 0;
      }
    }
    for (let i = height; i < stack[0]; i++) {
      if (caps[i] === undefined) {
        caps[i] = 0;
      }
      caps[i] += 1;
    }
    stack.push(height);
  }
  return result;
};
```

```javascript
/**
 * 空间复杂度O(n)
 * 时间复杂度O(n)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const leftArr = Array.from({ length: height.length });
  const rightArr = Array.from({ length: height.length });
  let leftMax = 0,
    rightMax = 0;
  for (let i = 0; i < height.length; i++) {
    if (height[i] >= leftMax) {
      leftArr[i] = 0;
      leftMax = height[i];
    } else {
      leftArr[i] = leftMax - height[i];
    }
    const ri = height.length - 1 - i;
    if (height[ri] >= rightMax) {
      rightArr[ri] = 0;
      rightMax = height[ri];
    } else {
      rightArr[ri] = rightMax - height[ri];
    }
  }
  const result = Array.from({ length: height.length });
  for (let i = 0; i < result.length; i++) {
    result[i] = Math.min(leftArr[i], rightArr[i]);
  }
  return result.length ? result.reduce((a, b) => a + b) : 0;
};
```

```rust
impl Solution {
    pub fn trap(height: Vec<i32>) -> i32 {
        let left: Vec<i32> = height
            .iter()
            .scan(0, |acc, &x| {
                if *acc <= x {
                    *acc = x;
                    Some(0)
                } else {
                    Some(*acc - x)
                }
            })
            .collect();
        let right: Vec<i32> = height
            .iter()
            .rev()
            .scan(0, |acc, &x| {
                if *acc <= x {
                    *acc = x;
                    Some(0)
                } else {
                    Some(*acc - x)
                }
            })
            .collect();
        let right_rev: Vec<i32> = right.into_iter().rev().collect();
        left.iter()
            .zip(&right_rev)
            .map(|(a, b)| std::cmp::min(a, b))
            .fold(0, |a, b| a + b)
    }
}
```

# 2021.04.03 最长公共子序列

[https://leetcode-cn.com/problems/longest-common-subsequence/](https://leetcode-cn.com/problems/longest-common-subsequence/)

```javascript
/**
 * 时间复杂度O(n2)
 * 空间复杂度O(n)
 * 动态规划
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const dp = Array.from({ length: text2.length + 1 }).map(() => 0);
  for (let i = 1; i <= text1.length; i++) {
    const prevDp = Array.from(dp);
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = prevDp[j - 1] + 1;
      } else {
        dp[j] = Math.max(prevDp[j], dp[j - 1]);
      }
    }
  }
  return dp[text2.length];
};
```

```rust
impl Solution {
    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        let mut dp: Vec<i32> = vec![0; text2.len() + 1];
        let chars1: Vec<char> = text1.chars().collect();
        let chars2: Vec<char> = text2.chars().collect();
        for i in 1..=text1.len() {
            let prev_dp = dp.clone();
            for j in 1..=text2.len() {
                if chars1[i - 1] == chars2[j - 1] {
                    dp[j] = prev_dp[j - 1] + 1;
                } else {
                    dp[j] = std::cmp::max(prev_dp[j], dp[j - 1])
                }
            }
        }
        dp[text2.len()]
    }
}
```

# 2021.04.04 森林中的兔子

[https://leetcode-cn.com/problems/rabbits-in-forest/](https://leetcode-cn.com/problems/rabbits-in-forest/)

1. 回答内容不一样的兔子必不是同一种颜色
2. 回答内容一样的兔子可能是同一种颜色
3. 回答 `[0]`,`[1,1]`,`[2,2,2]`,`[3,3,3,3]`,`[4,4,4,4,4]`的兔子同一种颜色

```javascript
/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function (answers) {
  let result = 0;
  const map = new Map();
  for (const answer of answers) {
    let prevValue = map.get(answer) || 0;
    map.set(answer, prevValue + 1);
  }
  for (const [key, value] of map) {
    result += ~~(value / (key + 1)) * (key + 1);
    if (value % (key + 1) !== 0) {
      result += key + 1;
    }
  }
  return result;
};
```

```rust
impl Solution {
    pub fn num_rabbits(answers: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let mut map: HashMap<i32, i32> = HashMap::new();
        let mut result = 0;
        for answer in answers.iter() {
            let prev_value = map.get(answer).unwrap_or(&0);
            map.insert(answer.clone(), prev_value + 1);
        }
        for (key, value) in map {
            result += (value / (key + 1)) * (key + 1);
            if value % (key + 1) != 0 {
                result += key + 1;
            }
        }
        result
    }
}
```

# 2021.04.05 合并两个有序数组

[https://leetcode-cn.com/problems/merge-sorted-array/](https://leetcode-cn.com/problems/merge-sorted-array/)

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let i = 0;
  while (i < m) {
    if (nums1[i] > nums2[0]) {
      const tmp = nums1[i];
      nums1[i] = nums2[0];
      nums2[0] = tmp;

      for (let k = 0; k < n - 1; k++) {
        if (nums2[k] > nums2[k + 1]) {
          const tmp2 = nums2[k];
          nums2[k] = nums2[k + 1];
          nums2[k + 1] = tmp2;
        }
      }
    }
    i += 1;
  }
  for (let k = 0; k < n; k++) {
    nums1[k + m] = nums2[k];
  }
};
```

```rust
impl Solution {
    pub fn merge(nums1: &mut Vec<i32>, m: i32, nums2: &mut Vec<i32>, n: i32) {
        if n != 0 {
            for i in 0..(m as usize) {
                if nums1.get(i) > nums2.get(0) {
                    let tmp = nums1.get(i).unwrap().clone();
                    nums1[i] = nums2[0];
                    nums2[0] = tmp;
                    for j in 0..((n - 1) as usize) {
                        if nums2[j] > nums2[j + 1] {
                            let tmp_2 = nums2[j];
                            nums2[j] = nums2[j + 1];
                            nums2[j + 1] = tmp_2;
                        }
                    }
                }
            }
            for j in 0..(n as usize) {
                nums1[(m as usize) + j] = nums2[j];
            }
        }
    }
}
```

# 2021.04.06 删除有序数组中的重复项 II

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (!nums || !nums.length) return nums;
  let prevCount = 1;
  let prevValue = nums[0];
  let storeIndex = nums.length - 1;
  for (let i = 1; i <= storeIndex; i++) {
    const current = nums[i];
    if (prevValue === current) {
      prevCount += 1;
      if (prevCount > 2) {
        swap(nums, i, storeIndex--);
        for (let j = i; j < storeIndex; j++) {
          if (nums[j] > nums[j + 1]) {
            swap(nums, j, j + 1);
          } else {
            break;
          }
        }
        i -= 1;
        continue;
      }
    } else {
      prevCount = 1;
      prevValue = current;
    }
  }
  return storeIndex + 1;
};

/**
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
function swap(nums, i, j) {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}
```

```rust
impl Solution {
    pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
        if nums.len() == 0 {
            return 0;
        }
        let mut prev_count = 1;
        let mut prev_value = nums[0];
        let mut store_index = nums.len() - 1;
        let mut i = 1;
        while i <= store_index {
            let current = nums[i];
            if current == prev_value {
                prev_count += 1;
                if prev_count > 2 {
                    Solution::swap(nums, i, store_index);
                    store_index -= 1;
                    for j in i..store_index {
                        if nums[j] > nums[j + 1] {
                            Solution::swap(nums, j, j + 1);
                        } else {
                            break;
                        }
                    }
                    i -= 1;
                }
            } else {
                prev_count = 1;
                prev_value = current;
            }
            i += 1;
        }
        (store_index as i32) + 1
    }
    fn swap(nums: &mut Vec<i32>, i: usize, j: usize) {
        let tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

# 2021.04.07 搜索旋转排序数组 II

[https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  if (!nums.length) return false;
  if (target >= nums[0]) {
    for (let i = 0; i < nums.length; i++) {
      if (target === nums[i]) {
        return true;
      } else if (nums[i] > target) {
        return false;
      }
    }
    return false;
  } else {
    for (let i = nums.length - 1; i >= 0; i--) {
      if (target === nums[i]) {
        return true;
      } else if (nums[i] < target) {
        return false;
      }
    }
    return false;
  }
};
```

```rust
impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> bool {
        if nums.len() == 0 {
            return false;
        }
        if target >= nums[0] {
            for i in 0..nums.len() {
                if nums[i] == target {
                    return true;
                } else if nums[i] > target {
                    return false;
                }
            }
            return false;
        } else {
            for i in (0..nums.len()).rev() {
                if nums[i] == target {
                    return true;
                } else if nums[i] < target {
                    return false;
                }
            }
            return false;
        }
    }
}
```

# 2021.04.08 寻找旋转数组中的最小值

[https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  if (nums[0] > nums[nums.length - 1]) {
    for (let i = nums.length - 1; i > 0; i--) {
      if (nums[i - 1] > nums[i]) {
        return nums[i];
      }
    }
  } else {
    return nums[0];
  }
};
```

# 2021.04.09 寻找旋转排序数组中的最小值 II

[https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  if (nums.length <= 1) return nums[0];
  if (nums[0] >= nums[nums.length - 1]) {
    for (let i = nums.length - 1; i > 0; i--) {
      if (nums[i - 1] > nums[i]) {
        return nums[i];
      }
    }
  }
  return nums[0];
};
```

# 2021.04.10 丑数

[https://leetcode-cn.com/problems/ugly-number/](https://leetcode-cn.com/problems/ugly-number/)

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
  while (n > 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else if (n % 3 === 0) {
      n /= 3;
    } else if (n % 5 === 0) {
      n /= 5;
    } else {
      break;
    }
  }
  return n === 1;
};
```

# 2021.04.11 丑数 II

[https://leetcode-cn.com/problems/ugly-number-ii/](https://leetcode-cn.com/problems/ugly-number-ii/)

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
  const list = [1, 2, 3, 5];
  const set = new Set(list);
  while (--n) {
    const value = list.shift();
    if (!set.has(value * 2)) {
      list.push(value * 2);
      set.add(value * 2);
    }
    if (!set.has(value * 3)) {
      list.push(value * 3);
      set.add(value * 3);
    }
    if (!set.has(value * 5)) {
      list.push(value * 5);
      set.add(value * 5);
    }
    heapify(list);
  }
  return list[0];
};

/**
 * @param {number[]} arr
 * @param {number} n
 */
function heapify(arr) {
  for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
    let child = i * 2 + 1;
    if (child < arr.length) {
      if (child + 1 < arr.length && arr[child + 1] < arr[i]) {
        child += 1;
      }
      if (arr[child] < arr[i]) {
        swap(arr, child, i);
      }
    }
  }
}

/**
 * @param {number[]} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
```

# 2021.04.12 最大数

[https://leetcode-cn.com/problems/largest-number/](https://leetcode-cn.com/problems/largest-number/)

```javascript
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  nums.sort((num1, num2) => {
    return (
      num2 * Math.pow(10, String(num1).length) +
      num1 -
      (num1 * Math.pow(10, String(num2).length) + num2)
    );
  });
  let result = nums.join("");
  let count = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === "0") {
      count += 1;
    } else {
      break;
    }
  }
  if (count > 1) {
    result = result.substr(count - 1);
  }
  return result;
};
```

# 2021.04.13 二叉搜索树节点最小距离

[https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  if (!root) return Infinity;
  const val = root.val;
  let left = root.left;
  while (left && left.right) {
    left = left.right;
  }
  let right = root.right;
  while (right && right.left) {
    right = right.left;
  }
  let diff = Infinity;
  if (left) {
    diff = Math.min(diff, val - left.val);
  }
  if (right) {
    diff = Math.min(diff, right.val - val);
  }
  return Math.min(diff, minDiffInBST(root.left), minDiffInBST(root.right));
};
```

# 2021.04.14 实现 Trie（前缀树）

[https://leetcode-cn.com/problems/implement-trie-prefix-tree/](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

```javascript
/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this._tree = {};
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  const chars = word.split("");
  chars[chars.length - 1] += "#";
  let current = this._tree;
  while (chars.length) {
    const char = chars.shift();
    if (!current[char]) {
      current[char] = {};
    }
    current = current[char];
  }
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const chars = word.split("");
  chars[chars.length - 1] += "#";
  let current = this._tree;
  while (chars.length) {
    const char = chars.shift();
    if (!current[char]) return false;
    current = current[char];
  }
  return true;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  const chars = prefix.split("");
  let current = this._tree;
  while (chars.length) {
    const char = chars.shift();
    if (!current[char]) return this.search(prefix);
    current = current[char];
  }
  return true;
};
```

# 2021.04.15 打家劫舍 II

[https://leetcode-cn.com/problems/house-robber-ii/](https://leetcode-cn.com/problems/house-robber-ii/)

状态转移方程为

> dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i])

这道题还需要注意的一个点是数组的第一个和最后一个元素不可以同时取到。所以跑了两次，分别去取不到第一个和最后一个元素，取最大。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length <= 3) {
    return Math.max(...nums);
  }
  return Math.max(
    robRange(nums, 0, nums.length - 2),
    robRange(nums, 1, nums.length - 1)
  );
};

/**
 *
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 */
function robRange(nums, start, end) {
  let first = nums[start];
  let second = Math.max(first, nums[start + 1]);
  for (let i = start + 2; i <= end; i++) {
    let tmp = second;
    second = Math.max(second, first + nums[i]);
    first = tmp;
  }
  return second;
}
```

# 2021.04.16

[https://leetcode-cn.com/problems/scramble-string/](https://leetcode-cn.com/problems/scramble-string/)

```javascript
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
  const length = s1.length;
  const memo = Array.from({ length }).map(() =>
    Array.from({ length }).map(() => Array.from({ length: length + 1 }).fill(0))
  );
  return dfs(s1, s2, 0, 0, length, memo);
};

/**
 *
 * @param {string} s1
 * @param {string} s2
 * @param {number} i
 * @param {number} j
 * @param {number} length
 * @param {*} memo
 */
function dfs(s1, s2, i, j, length, memo) {
  if (memo[i][j][length] !== 0) {
    return memo[i][j][length] === 1;
  }

  if (s1.slice(i, i + length) === s2.slice(j, j + length)) {
    memo[i][j][length] = 1;
    return true;
  }

  if (!isHarmoney(s1, s2, i, j, length)) {
    memo[i][j][length] = -1;
    return false;
  }

  for (let k = 1; k < length; k++) {
    if (
      (dfs(s1, s2, i, j, k, memo) &&
        dfs(s1, s2, i + k, j + k, length - k, memo)) ||
      (dfs(s1, s2, i, j + length - k, k, memo) &&
        dfs(s1, s2, i + k, j, length - k, memo))
    ) {
      memo[i][j][length] = 1;
      return true;
    }
  }

  memo[i][j][length] = -1;
  return false;
}

/**
 * @param {string} s1
 * @param {string} s2
 * @param {number} i
 * @param {number} j
 * @param {number} length
 */
function isHarmoney(s1, s2, i, j, length) {
  const map = Object.create(null);
  while (length--) {
    const char1 = s1[i++];
    const char2 = s2[j++];
    if (map[char1] === undefined) {
      map[char1] = 0;
    }
    if (map[char2] === undefined) {
      map[char2] = 0;
    }
    map[char1] += 1;
    map[char2] -= 1;
  }
  for (const value of Object.values(map)) {
    if (value !== 0) {
      return false;
    }
  }
  return true;
}
```

# 2021.04.17 存在重复的元素 II

[https://leetcode-cn.com/problems/contains-duplicate-iii/](https://leetcode-cn.com/problems/contains-duplicate-iii/)

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  const sized = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (sized.some(one => Math.abs(one - current) <= t)) {
      return true;
    }
    sized.push(current);
    if (sized.length > k) {
      sized.shift();
    }
  }
  return false;
};
```
