# moderate-server
server from moderate

# 文档托管后台过程
## 前端动态请求后台md数据
后台通过nodejs中的fs模块读取指定文件夹下的md文件，并格式化成字符串传给前端，

## 监听指定文件夹下的文件变化
```js
const chokidar = require("chokidar");

const watcher = chokidar.watch(docsDir.path, {
  ignored: /[\/\\]\./,
  ignoreInitial: process.env.initDoc !== "true",
});
watcher
  .on("add", function (path) {
    console.log("File", path, "has been added");
  })
  .on("unlink", function (path) {
    console.log("File", path, "has been delete");
  });
```

## 监听变化后，注册到数据库中