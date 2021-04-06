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
