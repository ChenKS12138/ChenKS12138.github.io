---
title: redux-saga初试
date: 2020-06-13T22:45:12.000Z
tags:
  - JavaScript
  - 随笔
coverImage: ./redux-saga.png
---

# 前言

`redux`是一个`JavaScript`的状态容器，`redux-saga`是 redux 的一个中间件，`react-redux`是一个通过高阶函数的方式实现连接 redux 和 react 组件的库。`redux`有`state`,`action`,`dispatch`,`reducer`的概念。通过 dispatch 一个 action，调用 reducer 产生另个 state，替换 store 里的 state，实现状态的更新，react 再通过 diff 算法得到最小的需要更新的 dom，实现页面更新。

# 关于 Generator

`redux-saga`使用了 ES6 的 Generator，因此我们需要对 Generator 有个认识。首先需要理解`迭代器`,`生成器`,`可迭代对象`。生成器是一个 Generator Function，可以返回一个迭代器。可以通过不断调用迭代器的 next 方法进行迭代。可迭代对象是一个具有[Symbol.iterator]的对象，常见的像`Array`，`Map`，`Set`都是属于可迭代对象，当然我们也可以构造自己的可迭代对象。

```javascript
class BookShelf {
  constructor() {
    this.books = [];
  }
  add(bookName) {
    this.books.push(bookName);
  }
  *[Symbol.iterator]() {
    let index = 0;
    while (index < this.books.length) {
      yield this.books[index++];
    }
    return;
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

# 使用 Generator Function 处理异步函数

ES2017 的`async`,`await`给我们提供了一种同步的写法来编写异步逻辑的函数，但我们也可以通过`Promise`加上`Generator Function`达到和`async`,`await`类似一样的效果。并且后者更利于进行测试，这也是`redux-saga`处理副作用的方式。可以通过调用 Generator Function 产生一个 Iterator，对其进行迭代，确保每次迭代的结果符合预期，即测试成功。

```javascript
/**
 * @param {number} second
 */
const sleep = second =>
  new Promise((resolve, reject) => {
    if (second < 0) {
      reject("second less than 0");
      return;
    }
    setTimeout(() => {
      resolve(`Sleep ${second}ms`);
    }, second);
  });

/**
 * @param {GeneratorFunction} generatorFunc
 */
const asyncWrapper = generatorFunc => {
  const iterator = generatorFunc();
  /**
   * @param {Iterator} iterator
   * @param {IteratorReturnResult} current
   */
  const handleIterate = (iterator, current) => {
    if (current && current.done) {
      return;
    } else if (current === undefined) {
      handleIterate(iterator, iterator.next());
    } else if (current.value instanceof Promise) {
      current.value.then(
        result => handleIterate(iterator, iterator.next(result)),
        reason => handleIterate(iterator, iterator.throw(reason))
      );
    }
  };
  handleIterate(iterator);
};

asyncWrapper(function* () {
  console.log("sleep start");
  const str1 = yield sleep(1000);
  console.log(str1);
  try {
    const str2 = yield sleep(-1000);
    console.log(str2);
  } catch (error) {
    console.log(`sleep error: ${error}`);
  }
  console.log("sleep end");
});
// sleep start
// Sleep 1000ms
// sleep error: second less than 0
// sleep end
```

# 关于 redux-saga

redux-saga 使得副作用更容易被管理。对于一些异步函数的调用，并不是在 Generator 函数内部执行，而是类似通过 yield 一个 Promise 的方式，在外部调用后，外部通过 next 方法，让 yield 左边得到返回值。这使得生成器中的异步逻辑完全可以被测试。

`redux-saga`中的几个概念。`saga辅助函数`，用于当特定的 action（或者是使用`*`同配所有的 action）被 dispatch 到 store 时派发任务，使用一定的 saga 处理。`saga`，一个可以多次 yield effect 的 Generator Function，通过 yield effect，处理异步逻辑。`effect`，可以通过`redux-saga/effects`的内置函数像`call`,`apply`,`cps`,`put`创建，也可以是一个普通的 Promise 对象，此时 yield 的左值就是 Promise 的 resolve 的 value，甚至可以 yield 一个普通的 JavaScript 对象。

# 关于 redux-thunk

`redux-thunk`也是`redux`里常用的一个中间件，它允许我们通过 dispatch 一个函数来处理异步逻辑，函数的第一/二个参数分别是`dispatch`，`getState`。核心代码很少，只有 20 行不到。

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
```

作为中间件会被`redux`依次调用
