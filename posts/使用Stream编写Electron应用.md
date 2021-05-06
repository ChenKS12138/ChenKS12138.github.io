---
title: 使用Stream编写Electron应用
date: 2021-05-04 17:36:32
tags: ["随笔"]
---

# Stream 的概念

Steram 是 Nodejs 中比较重要的概念，它是对一些流动数据的处理过程的抽象。常见的像标准输入/输出流、文件、Socket、压缩过程都可以被抽象成 Nodejs 中的流。所有的流本质上都是 EventEmitter。

> A stream is an abstract interface for working with streaming data in Node.js. The stream module provides an API for implementing the stream interface.
>
> There are many stream objects provided by Node.js. For instance, a request to an HTTP server and process.stdout are both stream instances.
>
> Streams can be readable, writable, or both. All streams are instances of EventEmitter.

常见的流有 Writable，Readable，Duplex，Transform 等<sup>[[1]](#reference-1)</sup>。Readable 可以理解为是生产者，提供一个 read 方法，处在一个 pipeline 的上游，Writeable 可以理解为消费者，提供一个 write 方法，处在一个 pipeline 的下游，Duplex 兼具 read 和 write 方法，Transform 和 Duplex 很类似，区别在于 Transform 的数据的流入和流出有比较强的关系，可以用于压缩等场景。

# 基于 TCP 白板应用

这是一个基于 TCP 通信的电子白板 Electron 应用，多个应用实例启动，其中一个实例作为 TCP 服务端，其他实例加入。服务端实例可以向自身的信息，每个客户端实例可以接受服务端的信息并同步到自己的画布上，又或者是将自己的信息透过服务端实例广播给其他客户端实例。当服务端实例监听到有新的客户端实例中途加入时，会将自身的画布信息同步给它。

![example](../assets/stream-whiteboard/example.gif)

这个画布功能的实现主要是通过监听鼠标在 canvas 上的操作，获取和修改 canvas 的 imageData 实现的。使用 ipc 通信，将数据传递给 main process。再经过节流、差异比对、数据压缩、将数据块大小编码至数据块前部这样一些操作后，再广播给其他实例。

```javascript
/**
 * Server Instance
 */

// Pipe Msg, Server -> Client
stream.pipeline(
  new EmitterEventStream(ipcMain, events.SERVER_BROADCAST_MESSAGE),
  new ThrottleStream(16),
  new GenerateDiffStream(bitmapBuffer),
  new CompressStream(),
  new SizePrefixedChunkEncodeStream(),
  broadcastStream,
  () => {}
);

// Pipe Msg, Client -> Server
stream.pipeline(
  broadcastStream,
  new SizePrefixedChunkDecodeStream(960000),
  new DecompressStream(),
  new ApplyDiffStream(bitmapBuffer),
  new WebContentsEventStream(
    mainWindow.webContents,
    events.SERVER_ON_RECERIVED_BROADCAST_MESSAGE
  ),
  () => {}
);

/**
 * Client Instance
 */

// Pipe Msg, Server -> Client
stream.pipeline(
  connection,
  new SizePrefixedChunkDecodeStream(960000),
  new DecompressStream(),
  new ApplyDiffStream(bitmapBuffer),
  new WebContentsEventStream(
    mainWindow.webContents,
    events.CLIENT_ON_RECEIVED_BROADCAST_MESSAGE
  ),
  () => {}
);

// Pipe Msg, Client -> Server
stream.pipeline(
  new EmitterEventStream(ipcMain, events.CLIENT_BROADCAST_MESSAGE),
  new ThrottleStream(16),
  new GenerateDiffStream(bitmapBuffer),
  new CompressStream(),
  new SizePrefixedChunkEncodeStream(),
  connection,
  () => {}
);
```

TCP 是面向流的协议<sup>[[2]](#reference-1)</sup>，发送一个 chunk 后，chunk 可能会被拆分。接收端需要一个长度信息，将 chunk 重新组合。我通过`SizePrefixedChunkEncodeStream`和`SizePrefixedChunkDecodeStream`实现了这一个功能。

通过数据的简单观察发现，在使用`zlib.deflate`和`zlib.inflate`压缩 600x400x4 字节的 chunk 时，chunk 的 0x00 的字节越多，压缩效果越明显。所以我使用了计算/应用 diff 的流、压缩/解压缩的流。

## 参考引用

- [1] https://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/
- [2] https://stackoverflow.com/questions/17446491/tcp-stream-vs-udp-message
