---
title: 初试flutter
tags: ["Flutter", "Dart", "跨端技术"]
date: 2019-09-25 16:59:47
index_img: ../assets/flutter.jpg
---

# 概述

主要是讲我对`flutter` 的初次尝试吧，写了个南邮图书馆 APP。感觉可以优化的地方还很多，第一次使用`flutter` 对`widget` 的使用还不太熟悉，布局写得不太好。先说说我的思路吧，一般来说，说到爬虫都会想到后端，web 前端因为有浏览器的同源限制，所以很难使用爬虫技术。但是在`client` 就没有`brower` 的同源限制了，我可以在`APP` 上使用爬虫技术。我在`GitHub`上看到了[/gaoliang/NJUPT-API](https://github.com/gaoliang/NJUPT-API) ，这个是学长用`Python` 封装的爬取南邮的一些信息系统接口库。我就参考了学长的代码，自己写了爬虫代码。 编辑器方面，我没有用`vs code` 而是用了`Android Studio` 毕竟是弄`Android` 开发。~~小声 BB，jetbrain 家的编辑器都长一个样，高亮不怎么好看~~ 。初步了解`Dart` 语法后就开始写了。

# 用了`Dart`

确实挺多人吐槽`JavaScript` 的弱类型，开发时灵活快捷时优点，但是也有缺点，不仅开发者不容易 debug，对 IDE 也不友好 IDE 不好做类型检查。`Dart` 是强类型面向对象单继承的编程语言，它的语法和`Java` 还有`JavaScript` 都很像。不过有点想吐槽它的包管理，添加依赖要手动改配置文件。 ~~估计是我 npm/yarn 用多了。~~ 目前`pub` 上的库还是挺少的，不过一些常用的还是有的。`dart` 也有一些有意思的地方。像`?.`、`??` 、`..` ~~目前只用过这三个~~ 。

```dart
class Person {
    String name;
    String sex;
    Person(this.name,this.sex);
    void setName(String name){
        this.name = name;
    }
    void setSex(String sex){
        this.sex= sex;
    }
}
void main(List<String> args){
    Person p = new Person('chen','male');
    var a = p?.age;
    var b = p.age ?? p.name;
    p..setName('chen2')..setSex('male2');
}
```

`?.` 可以避免访问的对象为空的问题，`??` 如果第一个操作数为`null` 就会返回第二个的值。`..` 是联级操作符，可以使你在一个对象上连续操作，这样确实可以少写几个临时变量。

# 关于`flutter`

`flutter` 是`Google` 的一个跨平台应用框架。我用的是它的自带的`material` 组件库。使用上和`react` 有的地方有点像。每个`statefulWidget` 或`statelessWidget` 都有`build` 方法，这个和`react` 类组件中的`render` 有点像。`build` 方法会返回一个`widget` ，最终被渲染出来。`statefulWidget` 和`statelessWidget`的关系有点像`Component`和`PureComponent` ，组件是否有自己的状态。状态管理方面，我用的是`Provider` 诶，目前了解不多，就不做介绍了。

使用`statefulWidget` 和 `statelessWidget`

```dart
import 'package:flutter/material.dart';
class Home extends statefulWidget{

    @override
    _Home createState() => _Home();
}
class _Home extends State<Home>{
    String text;
    @override
    Widget build(BuildContext context){
        return new Center(
            child: Text(text)
        );
    }
}

class Home2 extends statelessWidget{
    @override
    Widget build(BuildContext){
        return new Center(
        	child:Text('home')
        );
    }
}
```

使用`Component` 和`PureComponent`

```jsx
import React from "react";
class Home extends React.Component {
  constructor() {
    super();
    this.text = "home";
  }
  render() {
    return <div>{text}</div>;
  }
}
class Home2 extends React.PureComponent {
  constructor() {
    super();
    this.text = "home";
  }
}
```
