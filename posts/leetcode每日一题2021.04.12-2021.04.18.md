---
title: leetcode每日一题2021.04.12-2021.04.18
date: 2021-04-12 10:26:43
tags: ["leetcode"]
---

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
