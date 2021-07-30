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

# 2021.04.18 删除有序数组中的重复项

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const map = Object.create(null);
  let storeIndex = nums.length - 1;
  for (let i = 0; i <= storeIndex; i++) {
    heapify(nums, i, storeIndex);
    const current = nums[i];
    if (!map[current]) {
      map[current] = true;
    } else {
      swap(nums, storeIndex--, i);
      i -= 1;
    }
  }
  return storeIndex + 1;
};

/**
 *
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
function swap(nums, i, j) {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}

/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 */
function heapify(nums, start, end) {
  const len = end - start + 1;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    let child = i * 2 + 1 + start;
    if (child <= end) {
      if (child + 1 <= end && nums[child + 1] < nums[child]) child += 1;
      if (nums[child] < nums[i + start]) {
        swap(nums, child, i + start);
      }
    }
  }
}
```

# 2021.04.19 移除元素

[https://leetcode-cn.com/problems/remove-element/](https://leetcode-cn.com/problems/remove-element/)

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let storeIndex = nums.length - 1;
  for (let i = 0; i <= storeIndex; i++) {
    if (nums[i] === val) {
      swap(nums, i, storeIndex--);
      i -= 1;
    }
  }
  return storeIndex + 1;
};

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

# 2021.04.20 实现 strStr()

[https://leetcode-cn.com/problems/implement-strstr/](https://leetcode-cn.com/problems/implement-strstr/)

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (!needle.length) return 0;
  if (!haystack.length) return -1;
  for (let i = 0; i < haystack.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }
      if (j === needle.length - 1) {
        return i;
      }
    }
  }
  return -1;
};
```

# 2021.04.21 解码方法

[https://leetcode-cn.com/problems/decode-ways/](https://leetcode-cn.com/problems/decode-ways/)

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s || !s.length || s[0] === "0") return 0;
  const dp = Array.from({ length: s.length + 1 }).map(() => 0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== "0") {
      dp[i + 1] += dp[i];
    }
    const parsed = parseInt(s.slice(i - 1, i + 1));
    if (parsed > 9 && parsed < 27) {
      dp[i + 1] += dp[i - 1];
    }
  }
  return dp[s.length];
};
```

# 2021.06.01 你能在你最喜欢的那天吃到你最喜欢的糖果吗

前缀和。需要保证可以吃到的糖果数量落在一个区间内。

```javascript
/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function (candiesCount, queries) {
  // return queries.map((one) => canEatQuery(candiesCount, one));
  const arr = Array.from({ length: candiesCount.length });
  arr[0] = 0;
  for (let i = 1; i < candiesCount.length; i++) {
    arr[i] = arr[i - 1] + candiesCount[i - 1];
  }
  const result = Array.from({ length: queries.length }).fill(false);
  console.log(arr);
  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    const [favoriteType, favoriteDay, dailyCap] = query;
    const n = arr[favoriteType];
    if ((favoriteDay + 1) * dailyCap <= n) {
      result[i] = false;
    } else if (n + candiesCount[favoriteType] < favoriteDay + 1) {
      result[i] = false;
    } else {
      result[i] = true;
    }
  }
  return result;
};
```

# 2021.06.02 连续的子数组和

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  if (nums.length < 2) return false;
  const prefixs = [];
  const set = new Set();
  prefixs[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const current = (prefixs[i - 1] + nums[i]) % k;
    prefixs[i] = current;
    if (i > 0 && current === 0) {
      return true;
    }
    if (i > 1) {
      set.add(prefixs[i - 2]);
    }
    if (set.has(current)) {
      return true;
    }
  }
  return false;
};
```

### 2021.06.06 一和零

```javascript
/**
 * 使用递归的解法
 */
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  return findMax(strs, m, n);
};

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @param {number} currentM
 * @param {number} currentN
 */
function findMax(strs, m, n, index = 0, currentM = 0, currentN = 0) {
  if (!strs.length || index >= strs.length || currentM > m || currentN > n)
    return 0;
  const item = strs[index];
  const nextM = currentM + item.split("").filter(one => one === "0").length;
  const nextN = currentN + item.split("").filter(one => one === "1").length;
  return Math.max(
    findMax(strs, m, n, index + 1, currentM, currentN),
    nextM <= m && nextN <= n
      ? 1 + findMax(strs, m, n, index + 1, nextM, nextN)
      : 0
  );
}
```

# 2021.06.25 打开转盘锁

```javascript
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  if (deadends.includes(target)) return -1;
  const queue = ["0000"];
  const visited = new Set();
  let depth = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const item = queue.shift();
      if (deadends.includes(item) || visited.has(item)) {
        continue;
      }
      visited.add(item);
      if (item === target) {
        return depth;
      } else {
        shift(item, 0, -1, queue, visited);
        shift(item, 0, 1, queue, visited);
        shift(item, 1, -1, queue, visited);
        shift(item, 1, 1, queue, visited);
        shift(item, 2, -1, queue, visited);
        shift(item, 2, 1, queue, visited);
        shift(item, 3, -1, queue, visited);
        shift(item, 3, 1, queue, visited);
      }
    }
    depth++;
  }
  return -1;
};

/**
 * @param {string} str
 * @param {number} index
 * @param {number} inc
 * @param {string[]} arr
 * @param {Set} set
 */
function shift(str, index, inc, arr, set) {
  const chars = str.split("");
  chars[index] = String((Number(chars[index]) + inc + 10) % 10);
  const next = chars.join("");
  if (!set.has(next)) {
    arr.push(next);
  }
}
```

# 2021.06.26 滑动谜题

```javascript
/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  const visited = new Set();
  const queue = [[...board[0], ...board[1]].join("")];
  let steps = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const item = queue.shift();
      if (item === "123450") return steps;
      visited.add(item);
      shiftAndPush(item, 1, queue, visited);
      shiftAndPush(item, 2, queue, visited);
      shiftAndPush(item, 3, queue, visited);
      shiftAndPush(item, 4, queue, visited);
    }
    steps += 1;
  }
  return -1;
};

/**
 *
 * @param {string} str
 * @param {number} direct
 * @param {string[]} arr
 * @param {set} set
 */
function shiftAndPush(str, direct, arr, set) {
  const chars = str.split("");
  const pos = chars.findIndex(one => one === "0");
  if (pos < 3 && direct === 1) return;
  if (pos % 3 === 2 && direct === 2) return;
  if (pos > 2 && direct === 3) return;
  if (pos % 3 === 0 && direct === 4) return;

  if (direct === 1) swap(chars, pos, pos - 3);
  if (direct === 2) swap(chars, pos, pos + 1);
  if (direct === 3) swap(chars, pos, pos + 3);
  if (direct === 4) swap(chars, pos, pos - 1);

  const nextStr = chars.join("");
  if (set.has(nextStr)) return;
  arr.push(nextStr);
}

function swap(arr, index1, index2) {
  const tmp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = tmp;
}
```

# 2021.07.01 传递信息

```go
func numWays(n int, relation [][]int, k int) (count int) {
	queue := make([]int, 0)
	queue = append(queue, 0)
	for ; k > 0; k-- {
		nextQueue := make([]int, 0)
        count = 0
		for _, r := range queue {
			for _, v := range relation {
				if v[0] == r {
					next := v[1]
					nextQueue = append(nextQueue, next)
					if next == n-1 {
						count += 1
					}
				}
			}
		}
		queue = nextQueue
	}
	return count
}
```

# 2021.07.02 雪糕的最大数量

```go
func maxIceCream(costs []int, coins int) int {
    if len(costs) == 0 || coins <= 0 {
        return 0
    }
	sort.Ints(costs)
	index := 0
	for {
		coins -= costs[index]
		if coins < 0 {
			return index
		} else if coins == 0 {
			return index + 1
		} else if index + 1 >= len(costs) {
			return len(costs)
		}
		index += 1
	}
}
```

# 2021.07.03 根据字符出现频率排序

```go
func frequencySort(s string) string {
	bucket := make(map[string]int)
	for _, v := range s {
		bucket[string(v)] += 1
	}
	chars := strings.Split(s, "")
	sort.Slice(chars, func(i, j int) bool {
		a := bucket[chars[i]]
		b := bucket[chars[j]]
		if a == b {
			return chars[i][0] > chars[j][0]
		}
		return b < a
	})
	s = strings.Join(chars, "")
	return s
}
```

# 2021.07.04 错误的集合

```go
func findErrorNums(nums []int) []int {
	bucket := make([]int, len(nums))
	for _, v := range nums {
		bucket[v-1] += 1
	}
	lack, duplicate := 0, 0
	for i, v := range bucket {
		if v == 2 {
			duplicate = i + 1
		} else if v == 0 {
			lack = i + 1
		}
	}
	return []int{duplicate, lack}
}
```

# 2021.07.06 点菜展示表

```go
func displayTable(orders [][]string) (result [][]string) {
	dict := make(map[string]map[string]int)
	tableSet := make(map[string]bool)
	foodSet := make(map[string]bool)
	for _, v := range orders {
		tableName := v[1]
		foodItem := v[2]
		tableSet[tableName] = true
		foodSet[foodItem] = true
		if _, ok := dict[tableName]; !ok {
			dict[tableName] = make(map[string]int)
		}
		dict[tableName][foodItem] += 1
	}

	foods := make([]string, 0)
	for k := range foodSet {
		foods = append(foods, k)
	}
	sort.Strings(foods)

	tables := make([]string, 0)
	for k := range tableSet {
		tables = append(tables, k)
	}
	sort.Slice(tables, func(i, j int) bool {
		a, _ := strconv.Atoi(tables[i])
		b, _ := strconv.Atoi(tables[j])
		return a < b
	})

	header := make([]string, 0)
	header = append(header, "Table")
	header = append(header, foods...)
	result = append(result, header)

	for _, table := range tables {
		row := make([]string, len(foods)+1)
		row[0] = table
		for i, foodItem := range foods {
			row[i+1] = fmt.Sprint(dict[table][foodItem])
		}
		result = append(result, row)
	}
	return result
}
```

# 2021.07.07 大餐计数

```go
const (
	MOD = 1e9 + 7
)

func countPairs(deliciousness []int) int {
	bucket := make(map[int]int)
	max := maxIntSlice(deliciousness)
	maxSum := max * 2
	count := 0
	sort.Ints(deliciousness)
	for _, v := range deliciousness {
		for sum := 1; sum <= maxSum; sum <<= 1 {
			c, ok := bucket[sum-v]
			if ok {
				count = (count + c) % MOD
			}
		}
		bucket[v] += 1
	}
	return count
}

func maxIntSlice(nums []int) (max int) {
	if len(nums) == 0 {
		panic("len == 0")
	}
	max = nums[0]
	for _, v := range nums {
		if v > max {
			max = v
		}
	}
	return max
}
```

# 2021.07.08 和相同的二元字数组

```go
func numSubarraysWithSum(nums []int, goal int) int {
	if len(nums) == 0 {
		return 0
	}
	prefixs := make([]int, len(nums)+1)
	for i, num := range nums {
		prefixs[i+1] = prefixs[i] + num
	}
	dict := make(map[int]int)
	result := 0
	for _, prefix := range prefixs {
		v, ok := dict[prefix-goal]
		if ok {
			result += v
		}
		dict[prefix] += 1
	}
	return result
}
```

# 2021.07.09 主要元素

```go
func majorityElement(nums []int) int {
	dict := make(map[int]int)
	for _, num := range nums {
		dict[num] += 1
	}
	l := len(nums)
	half := (l / 2) + 1
	for k, v := range dict {
		if v >= half {
			return k
		}
	}
	return -1
}
```

# 2021.07.10 基于时间的键值存储

```go
type TimeMapValue struct {
	TimeStamp int
	Value     string
}

type TimeMap struct {
	Dict map[string][]TimeMapValue
}

/** Initialize your data structure here. */
func Constructor() TimeMap {
	return TimeMap{
		Dict: make(map[string][]TimeMapValue),
	}
}

func (t *TimeMap) Set(key string, value string, timestamp int) {
	t.Dict[key] = append(t.Dict[key], TimeMapValue{
		Value:     value,
		TimeStamp: timestamp,
	})
}

func (t *TimeMap) Get(key string, timestamp int) string {
	s := t.Dict[key]
	if len(s) == 0 {
		return ""
	}
	l, r := 0, len(s)
	for l <= r {
		if l == r {
			if l >= len(s) {
				return s[len(s)-1].Value
			}
			if s[l].TimeStamp < timestamp {
				return s[l].Value
			}
			if s[l].TimeStamp > timestamp && (l-2) >= 0 {
				return s[l-2].Value
			}
		}
		mid := (l + r) / 2
		if s[mid].TimeStamp == timestamp {
			return s[mid].Value
		} else if s[mid].TimeStamp < timestamp {
			l = mid + 1
		} else {
			r = mid - 1
		}
	}
	return ""
}
```

# 2021.07.11 H 指数

```go
func hIndex(citations []int) int {
	if len(citations) == 0 {
		return 0
	}
	sort.Ints(citations)
	reverseInts(citations)
	for i, v := range citations {
		if i+1 > v {
			return i
		}
	}
	return len(citations)
}

func reverseInts(nums []int) {
	l := len(nums)
	if l == 0 {
		return
	}
	mid := l / 2
	for i := 0; i < mid; i++ {
		tmp := nums[i]
		nums[i] = nums[l-1-i]
		nums[l-1-i] = tmp
	}
}
```

# 2021.07.12 H 指数 II

```go
func hIndex(citations []int) int {
    if len(citations) == 0 {
        return 0
    }
    rev(citations)
    for i,v := range citations {
        if i+1 > v {
            return i
        }
    }
    return len(citations)
}

func rev(nums []int) {
    l := len(nums)
    mid := l/2
    for i:=0;i<mid;i++ {
        nums[i],nums[l-1-i] = nums[l-1-i],nums[i]
    }
}
```

# 2021.07.13

```go
func groupAnagrams(strs []string) [][]string {
	dict := make(map[string][]string)
	for _, str := range strs {
		sorted := sortedStr(str)
		value, ok := dict[sorted]
		if !ok {
			dict[sorted] = make([]string, 0, 1)
			value = dict[sorted]
		}
		dict[sorted] = append(value, str)

	}
	result := make([][]string, 0)
	for _, v := range dict {
		result = append(result, v)
	}
	return result
}

func sortedStr(str string) string {
	chars := ([]int32)(str)
	sort.Slice(chars, func(i, j int) bool {
		return chars[i] < chars[j]
	})
	return string(chars)
}
```

# 2021.07.14

```go
func search(nums []int, target int) int {
    l,r := 0,len(nums)-1
    for l<=r {
        mid := (l+r)/2
        if nums[mid] == target {
            count := 1
            l,r := mid-1,mid+1
            for l>=0 && nums[l] == target {
                count += 1
                l -= 1
            }
            for r < len(nums) && nums[r] == target {
                count += 1
                r += 1
            }
            return count
        } else if nums[mid] < target {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return 0;
}
```

# 2021.07.17

```go
func maxSubArray(nums []int) int {
    maxValue := nums[0]
    tmp := maxValue
    for i:=1;i<len(nums);i++ {
        if tmp <= 0 {
            tmp = nums[i]
        } else {
            tmp += nums[i]
        }
        maxValue = max(maxValue,tmp)
    }
    return maxValue
}

func max(a,b int )int {
    if a > b {
        return a
    } else {
        return b
    }
}
```

# 2021.07.18

```go
func groupAnagrams(strs []string) [][]string {
	dict := make(map[string][]string)
	for _, str := range strs {
		sorted := sortedStr(str)
		value, ok := dict[sorted]
		if !ok {
			dict[sorted] = make([]string, 0, 1)
			value = dict[sorted]
		}
		dict[sorted] = append(value, str)

	}
	result := make([][]string, 0)
	for _, v := range dict {
		result = append(result, v)
	}
	return result
}

func sortedStr(str string) string {
	chars := ([]int32)(str)
	sort.Slice(chars, func(i, j int) bool {
		return chars[i] < chars[j]
	})
	return string(chars)
}
```

# 2021.07.20

```go
func minPairSum(nums []int) int {
    p1,p2 := 0, len(nums)-1
    rec := append(sort.IntSlice(nil),nums...)
    rec.Sort()
    result := 0
    for p1 < p2 {
        result = max(result,rec[p1]+rec[p2])
        p1 += 1
        p2 -= 1
    }
    return result
}

func max(a,b int) int {
    if a > b {
        return a
    } else {
        return b
    }
}
```

# 2021.07.21

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    p1, p2 := headA, headB
    for p1 != nil && p2 != nil {
        p1 = p1.Next
        p2 = p2.Next
    }
    if p1 == nil {
        p3 := headB;
        for p2 != nil {
            p3 = p3.Next;
            p2 = p2.Next;
        }
        p2 = p3;
        p1 = headA;
    } else {
        p3 := headA;
        for p1 != nil {
            p3 = p3.Next;
            p1 = p1.Next;
        }
        p1 = p3;
        p2 = headB;
    }
    for p1 != nil && p2 != nil {
        if p1 == p2 {
            return p1;
        }
        p1 = p1.Next
        p2 = p2.Next
    }
    return nil
}
```

# 2021.07.24

```go
func maximumTime(time string) string {
	chars := ([]rune)(time)
	for i, v := range chars {
		if v == '?' {
			switch i {
			case 0:
				nextN := chars[1]
				if nextN == '?' || nextN == '0' || nextN == '1' || nextN == '2' || nextN == '3' {
					chars[0] = '2'
				} else {
					chars[0] = '1'
				}
			case 1:
				if chars[0] == '2' {
					chars[1] = '3'
				} else {
					chars[1] = '9'
				}
			case 3:
				chars[3] = '5'
			case 4:
				chars[4] = '9'
			}
		}
	}
	return string(chars)
}
```

# 2021.07.25

```go
type CountSet map[int]struct{}

func (cs CountSet) Update(value int) {
	_, ok := cs[value]
	if !ok {
		cs[value] = struct{}{}
	} else {
		delete(cs, value)
	}
}

func (cs CountSet) Pick() int {
	for k := range cs {
		return k
	}
	panic("Empty CountSet")
}

type PairMap map[int][]int

func (pm PairMap) Update(key, value int) {
	arr, ok := pm[key]
	if !ok {
		pm[key] = []int{value}
	} else {
		pm[key] = append(arr, value)
	}
}

func restoreArray(adjacentPairs [][]int) []int {
    if len(adjacentPairs) == 0 {
        return []int{}
    }
	cs := &CountSet{}
	pm := &PairMap{}
	for _, pair := range adjacentPairs {
		cs.Update(pair[0])
		cs.Update(pair[1])
		pm.Update(pair[0], pair[1])
		pm.Update(pair[1], pair[0])
	}
	head := cs.Pick()
	result := []int{head}
	set := make(map[int]struct{})
	set[head] = struct{}{}
	for {
		next, ok := (*pm)[result[len(result)-1]]
		if !ok {
			break
		} else {
			if _, found := set[next[0]]; !found {
				result = append(result, next[0])
				set[next[0]] = struct{}{}
			} else if len(next) > 1 {
				result = append(result, next[1])
				set[next[1]] = struct{}{}
			} else {
				break
			}
		}
	}
	return result
}
```

# 2021.07.27

```go
func findSecondMinimumValue(root *TreeNode) int {
	arr := append(sort.IntSlice(nil))
	var dfs func(root *TreeNode)
	dfs = func(root *TreeNode) {
		if root != nil {
			if len(arr) < 3 {
				arr = append(arr, root.Val)
			} else {
				arr[2] = root.Val
				arr.Sort()
			}
			if root.Left != nil && root.Right != nil {
				if root.Left.Val == root.Val {
					dfs(root.Right)
				} else if root.Right.Val == root.Val {
					return
				} else {
					dfs(root.Left)
				}
			}
		}
	}
	dfs(root)
	if arr.Len() < 2 {
		return -1
	}
    fmt.Println(arr)
	return arr[1]
}
```

# 2021.07.28

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func distanceK(root *TreeNode, target *TreeNode, k int) []int {
    if root == nil || target == nil {
        return []int{}
    }
	dict := make(map[*TreeNode](*TreeNode))
	var dfs1 func(root *TreeNode)
	dfs1 = func(root *TreeNode) {
		if root != nil {
			if root.Left != nil {
				dict[root.Left] = root
				dfs1(root.Left)
			}
			if root.Right != nil {
				dict[root.Right] = root
				dfs1(root.Right)
			}
		}
	}
	dfs1(root)
	result := []int{}
	visited := make(map[*TreeNode]struct{})
	var dfs2 func(root *TreeNode, k int)
	dfs2 = func(root *TreeNode, k int) {
		if root != nil {
			if k == 0 {
				result = append(result, root.Val)
			} else if k > 0 {
				if _, ok := visited[root.Left]; !ok {
					visited[root.Left] = struct{}{}
					dfs2(root.Left, k-1)
				}
				if _, ok := visited[root.Right]; !ok {
					visited[root.Right] = struct{}{}
					dfs2(root.Right, k-1)
				}
				parent := dict[root]
				if _, ok := visited[parent]; !ok {
					visited[parent] = struct{}{}
					dfs2(parent, k-1)
				}
			}
		}
	}
	visited[target] = struct{}{}
	dfs2(target, k)
	return result
}
```

# 2021.07.29

```go
func pathInZigZagTree(label int) []int {
	if label == 1 {
		return []int{1}
	}
	n := 1
	for pow2(n)-1 < label {
		n += 1
	}
	result := []int{}
	current := label
	for current > 1 {
		result = append(result, current)
		current /= 2
		n -= 1
		current = pow2(n-1) + pow2(n) - 1 - current
	}
	result = append(result, 1)
	for i := 0; i < len(result)/2; i++ {
		result[i], result[len(result)-1-i] = result[len(result)-1-i], result[i]
	}
	return result
}

func pow2(a int) int {
	if a < 0 {
		return 0
	}
	if a == 0 {
		return 1
	}
	return 1 << a
}
```

# 2021.07.30

```go
func titleToNumber(columnTitle string) int {
	result := 0
	for i := 0; i < len(columnTitle); i++ {
		index := len(columnTitle) - 1 - i
		result += int(columnTitle[index]-64) * int(math.Pow(26.0, float64(i)))
	}
	return result
}
```
