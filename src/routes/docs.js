const router = require("koa-router")();
const fs = require("fs");
const {
  SaveDoc,
  GetDoc,
  addDoc,
  deleteDoc,
  deleteAll,
  getAll,
  findDoc,
} = require("../db/docs");
const { docsDir } = require("../config/index");
const chokidar = require("chokidar");
const isInitDoc = process.env.initDoc === "true";
/**
 * regex 解析 文件头部信息
 * 返回 mongo 需要的信息 字段
 * @param data
 * @returns {Promise<*>}
 */
const parseDoc = async (path) => {
  var text = "";
  let toReadFile = () => {
    return new Promise((res, req) => {
      fs.readFile(path, (err, data) => {
        text = data.toString();
        res("异步");
      });
    });
  };
  await toReadFile();
  // 先截取  describe 优化后面 匹配性能
  var describe = text.match(/<describe>([\d\D]*?)<\/describe>/)[1];
  // 分别获取 title 等~~
  var title = describe.match(/title:\s*(.*?)\s*\n/)[1];
  var subhead = describe.match(/subhead:\s*(.*?)\s*\n/)[1];
  var cover = describe.match(/cover:\s*(\S*?)\s*\n/)[1];
  var date = describe.match(/date:\s*(\S*?)\s*\n/)[1];
  // TODO tag 支持 多个 >>> 数组
  // var tags = describe.match(/tags:[\d\D]*?- (.*)\s*\n/)[1]
  var tags0 = describe.match(/tags:\s*(\S*?)\s*\n/)?.[1];

  var desJson = {
    title,
    subhead,
    cover,
    date,
    tags: [tags0],
  };
  return desJson;
};

const toWatchFlies = async () => {
  const watcher = chokidar.watch(docsDir.path, {
    ignored: /[\/\\]\./,
    ignoreInitial: !isInitDoc,
  });
  watcher
    .on("add", async function (path) {
      //TODO 解析md文档中描述describe
      var describeInfo = await parseDoc(path);
      addDoc({ path, ...describeInfo });
      console.log("File", path, "has been added");
    })
    .on("change",async function (path) {
      deleteDoc({ path });
      var describeInfo = await parseDoc(path);
      addDoc({ path, ...describeInfo });
      console.log("File", path, "has been change");
    })
    .on("unlink", function (path) {
      deleteDoc({ path });
      console.log("File", path, "has been delete");
    });
};
if (isInitDoc) {
  deleteAll("docs").then(() => {
    toWatchFlies();
  });
} else {
  toWatchFlies();
}

router.prefix("/docs");
router.post("/list", async (ctx, next) => {});
router.post("/getDoc", async (ctx, next) => {
  let toReadFile = async () => {
    const docData = await findDoc({ _id: ctx.request.body.id });
    const path = docData.path;
    return new Promise((res, req) => {
      fs.readFile(path, (err, data) => {
        mdStr = data?.toString();
        res("");
      });
    });
  };
  await toReadFile();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: mdStr,
  };
});
router.post("/getAll", async (ctx, next) => {
  var save = await getAll();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: save,
  };
});

router.post("/update", SaveDoc); 
module.exports = router;
