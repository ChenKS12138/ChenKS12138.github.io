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

impl Solution {
		pub fn reverse_bits(x: u32) -> u32 {
				x.reverse_bits();
		}
}
```
