---
title: NPM上的软件供应链攻击
date: 2021-09-07T20:45:11.000Z
tags:
  - 信息安全
coverImage: ./5.png
---

# 前言

今年经历了一次软件供应链攻击，为此觉得有必要想详细复盘，并了解一些相关的攻击手段和可能的防范措施。NPM 有着丰富的生态，但是其中依赖包质量参差不齐，容易成为黑客进行渗透的手段。

# 经历复盘

<center>
  <img src="./1.png" alt="构建环境" />
  <div>图1-构建环境</div>
</center>
<center>
  <img src="./2.png" alt="依赖别名" />
  <div>图2-依赖别名</div>
</center>
<center>
  <img src="./3.png" alt="恶意脚本" />
  <div>图3-恶意脚本</div>
</center>
<center>
  <img src="./4.png" alt="官方标记" />
  <div>图4-官方标记</div>
</center>

由于构建流水线的的 NPM 版本过低，不支持`Dependency Alias`(NPM 6.9 及以上支持)。导致出现缺 NPM 包的现象，手动安装时，误安装了`fork-ts-checker-webpack-plugin-v5`，导致恶意的脚本被执行，造成本机的信息被泄露。

`fork-ts-checker-webpack-plugin-v5`是一个恶意包的名字，项目中 vue-cli 依赖的`fork-checker-webpack-plugin-v5`是`fork-checker-webpack-plugin`的一个别名。

恶意脚本通过在`preinstall`这一生命周期钩子进行 burp 扫描，收集了本机的环境变量和主机名。同时这是一个跨平台的脚本，windows 和\*nix 用户都会受到影响。

在后续的分析中，发现这个 NPM 包在此前已经被官方 registry 标记为恶意包了，但是通过 tencent 源还可以继续下载恶意包，这也是造成此次问题的一个原因。

# 典型案例分析

<center>
  <img src="./5.png" alt="恶意代码进入依赖树" />
  <div>图5-恶意代码进入依赖树</div>
</center>

这里整理的是恶意代码进入项目依赖树的几种方式，从依赖包的源代码编写，到构建发布，到镜像仓库托管，到用户下载，这整个链路都可能发生黑客攻击。

## 依赖混淆攻击

<center>
  <img src="./6.png" alt="依赖混淆攻击" />
  <div>图6-依赖混淆攻击</div>
</center>

<center>
  <img src="./7.png" alt="疑似内部依赖包" />
  <div>图7-疑似内部依赖包</div>
</center>

今年的 2 月 10 日，国外的安全研究员 Alex Birsan，发现了一段疑似 Paypal 内部的 package.json 的代码，公有的依赖包和私有的依赖包混合在一个文件中，并且这些私有的依赖包在 NPM registry 中均被没有注册过，于是他在 NPM 官方的 registry 上投放了一些同名的恶意包用来收集信息。普通用户如果没有设置好源，或者是内部镜像源出现了回源，高版本依赖包优先级高于低版本依赖包，也会有出现被污染的情况。最后 Paypal、苹果、Tesla 等公司受到影响。

## 误植域名攻击

<center>
  <img src="./8.png" alt="cross-env钓鱼包" />
  <div>图8-cross-env钓鱼包</div>
</center>

<center>
  <img src="./9.png" alt="cross-env钓鱼包" />
  <div>图9-cross-env钓鱼包</div>
</center>

<center>
  <img src="./10.png" alt="hacktask发布的恶意包" />
  <div>图10-hacktask发布的恶意包</div>
</center>

这个翻译可能有点让人摸不着头脑，换句通俗的话讲就是钓鱼攻击。用户在下载依赖包时，包名出现了偏差，导致下载到恶意包。看起来的很低级的错误，但是还是有发生的可能性，不少人会犯。用户`hacktask`在 NPM 上发布了大量的恶意包，目前已经全部被标记为恶意包，用的 NPM 账号及注册邮箱已被封禁。这也说明了一件事，批量发布恶意包是成本很低的一件事，可以根据 NPM 包命名规则批量生成恶意包，或者是提前抢注官方可能但未使用的包名称。

这些有的钓鱼包像`crossenv`在功能上甚至和官方包无差异，只是多增加一些旁路的恶意的逻辑会上报本机信息，这也是钓鱼包隐蔽的一个表现。

## event-stream 事件

<center>
  <img src="./11.png" alt="事件过程" />
  <div>图11-事件过程</div>
</center>

<center>
  <img src="./12.png" alt="原作者发言" />
  <div>图12-原作者发言</div>
</center>

原作者开发了`event-stream`包，作者个人维护这个包并没有什么获利，自己也不再使用，就直接将这个包的所有权交给了"热心网友"。但是这一举措被别有用心的人利用了，攻击者通过`社会工程手段`~~简单点说就是骗~~，获取到了该 NPM 包的所有权，然后让`event-stream@3.3.6`依赖了含恶意代码的`flatmap-stream`，一段时间后又发布了`event-stream@4.0.0`移除了相关的恶意代码，按照 NPM 的语义化版本规范，大部分用户的版本应该都是`^3.x.x`，这就导致了不会轻易升级 major 版本，但是容易升级 minor 版本，许多用户会停留在 3.3.6 版本，同时审查最新的源代码时又审查不出问题。

<center>
  <img src="./13.png" alt="事件的披露" />
  <div>图13-事件的披露</div>
</center>

`event-stream@3.3.6`在 2018.09.09 发布后，直到 2018.11.20 有开发者发现了`nodemon`的异常 warning 才被发现。使用 nodemon 运行一个空的 js 文件，却被提示使用了被废弃的加密模块的 API，事情才被披露。

直到 2018.11.26，NPM 官方下架了`flag-stream`和`event-stream@3.3.6`。

攻击者的目标是`copay`，目的是盗取用户的加密货币钱包私钥，只有当用户安装特定的依赖包时恶意代码才会生效，可见其隐蔽性之强。

# 可能的解决措施

从上面的例子看，攻击手段主要是利用了 NPM 的声明周期钩子，又或者是将恶意代码注入到依赖树中，我们是不是可以通过什么方式进行提前监测，又或者是实时拦截呢？

## 依赖包异常调用监测

<center>
  <img src="./14.png" alt="实时监测" />
  <div>图14-实时监测</div>
</center>

不管是什么样的 NPM 包，它依赖的一些能力如网络 I/O、文件 I/O、密码学能力（也可以纯 js 实现）等，都需要由`Internal Module`又或者是自行编写的`ffi`提供，可以通过对`Module.prototype.require`进行 hook，监听所有的`require`，如果这颗 require 树出现了不应该出现的依赖能力就需要人工进行排查。

目前只是一个比较初步的思路，`JavaScript`是一门动态语言，导致了我想通过静态分析的方式得到 require 树是比较困难的。当然也是可以通过一些事前的约定让静态分析得以实现。

## 依赖包可信指标检查

<center>
  <img src="./15.gif" alt="npq" />
  <div>图15-npq</div>
</center>

`npq`提供一个不错的事前检查的思路，我们在安装依赖包前，先从`发布时长`、`下载量`、`README`、`NPM生命周期钩子`、`漏洞库中的相关信息`、`开源许可`等维度对下载的依赖包进行审查，如果出现问题就阻塞下载让用户自行确认。这种方式对于钓鱼包，以及通过`pre/afterinstall`进行攻击的恶意包已经能有比较好的拦截了。

# 总结

恶意攻击和安全防御一直是一种此消彼长的状态，在这件事情上并没有银弹。每次新功能的加入都会伴随着一定的风险，当然也不是说一成不变就保障安全，对于我们设计出的软件，我们永远要做好安全方面的事前设计，事中的及时响应，事后的及时复盘。在这些安全问题中，人才是最薄弱的一环，我们需要通过设计更好的规则或者是工具，降低犯错的概率。

# 资料参考

- [1] https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610
- [2] https://security.tencent.com/index.php/blog/msg/182
- [3] https://snyk.io/blog/typosquatting-attacks/
- [4] https://snyk.io/blog/a-post-mortem-of-the-malicious-event-stream-backdoor/
- [5] https://github.com/remy/nodemon/issues/1442
- [6] https://github.com/dominictarr/event-stream/issues/116
