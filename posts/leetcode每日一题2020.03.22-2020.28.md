---
title: leetcode每日一题2020.03.22-2020.28
date: 2021-03-26 15:49:41
tags: ["leetcode"]
---

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
