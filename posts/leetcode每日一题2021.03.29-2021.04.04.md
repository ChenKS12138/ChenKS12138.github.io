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
