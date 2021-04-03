---
title: leetcode每日一题2021.03.29-2021.04.04
date: 2021-03-29 10:12:17
tags: ["leetcode"]
---

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
