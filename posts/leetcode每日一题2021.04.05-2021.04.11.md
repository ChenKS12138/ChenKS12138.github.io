---
title: leetcode每日一题2021.04.05-2021.04.11
date: 2021-04-05 11:04:07
tags: ["leetcode"]
---

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
