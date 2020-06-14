---
title: redux-saga初试
date: 2020-06-13 22:45:12
tags: ["JavaScript", "随笔"]
index_img: ../assets/redux-saga.png
---

## 前言

`redux`是一个`JavaScript`的状态容器，`redux-saga`是 redux 的一个中间件，`react-redux`是一个通过高阶函数的方式实现连接 redux 和 react 组件的库。`redux`有`state`,`action`,`dispatch`,`reducer`的概念。通过 dispatch 一个 action，调用 reducer 产生另个 state，替换 store 里的 state，实现状态的更新，react 再通过 diff 算法得到最小的需要更新的 dom，实现页面更新。

## 关于 Generator

`redux-saga`使用了 ES6 的 Generator，因此我们需要对 Generator 有个认识。首先需要理解`迭代器`,`生成器`,`可迭代对象`。生成器是一个 Generator Function，可以返回一个迭代器。可以通过不断调用迭代器的 next 方法进行迭代。可迭代对象是一个具有[Symbol.iterator]的对象，常见的像`Array`，`Map`，`Set`都是属于可迭代对象，当然我们也可以构造自己的可迭代对象。

```javascript
class BookShelf {
  constructor() {
    this.books = [];
    this[Symbol.iterator] = function* () {
      let index = 0;
      while (index < this.books.length) {
        yield this.books[index++];
      }
      return;
    };
  }
  add(bookName) {
    this.books.push(bookName);
  }
}
const bookShelf = new BookShelf();
bookShelf.add("book1");
bookShelf.add("book2");
bookShelf.add("book3");

for (const book of bookShelf) {
  console.log(book);
}
// book1
// book2
// book3
```

## 关于 redux-saga

redux-saga 使得副作用更容易被管理。对于一些异步函数的调用，并不是在 Generator 函数内部执行，而是类似通过 yield 一个 Promise 的方式，在外部调用后，外部通过 next 方法，让 yield 左边得到返回值。这使得异步函数的调用更容易被测试。

待补充。。。
