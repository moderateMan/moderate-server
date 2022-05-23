const router = require("koa-router")();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { generate, getDimension, initEdges } = require("./generate/index");
let Separator = "__";
const {
  SaveDoc,
  GetDoc,
  getCount,
  addDoc,
  deleteDoc,
  deleteAll,
  getAll,
  findDoc,
  
} = require("../../db/docs");
const {} = require("../../db/atlas");
const { docsDir } = require("../../config/index");
const chokidar = require("chokidar");

let atlas = { nodes: [], edges: [] };
let atlasType = 0;
// 生成组织数据
const toGenerateAtlas = (type) => {
  const dimension = getDimension(type);
  atlas.nodes = Object.values(dimension);
  return atlas;
};
toGenerateAtlas();
const isInitDoc = process.env.initDoc === "true";

/**
 * regex 解析 文件头部信息
 * 返回 mongo 需要的信息 字段
 * @param data
 * @returns {Promise<*>}
 */
const parseDoc = async (path, id) => {
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
  var date = describe.match(/date:\s*(.*?)\n/)[1];
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
  const toAdd = async (path) => {
    console.log("path"+path)
    const strArr = path.split("/");
    const docName = strArr[strArr.length-1];
    const pathPrefix = path
      .split("/")
      .slice(0, strArr.length - 1)
      .join("/");

    let id =docName.split(Separator).length > 1 && docName.split(Separator)[0];
    let toReWriteFile = () => {
      return new Promise((res, req) => {
        if (id) {
          res();
        } else {
          id = uuidv4()
          const newPath = `${pathPrefix}/${id}${Separator}${docName}`;
          fs.rename(path, newPath, function (err) {
            path = newPath;
            res();
          });
        }
      });
    };
    await toReWriteFile();
    //TODO 解析md文档中描述describe
    const describeInfo = await parseDoc(path);
    const docTemp = { id, path, ...describeInfo };
    let atlaItem = generate(docTemp);
    if (atlaItem) {
      const { node, edge } = atlaItem;
      node && atlas.nodes.push(node);
      atlas.nodes.forEach((item) => {
        if (node.tags.includes(item.tag)) {
          item.childrenNum++;
        }
      });
      edge && atlas.edges.push(edge);
    }

    addDoc(docTemp);
    console.log("File", path, "has been added");
  };
  watcher
    .on("add", async function (path) {
      toAdd(path);
    })
    .on("change", async function (path) {
      deleteDoc({ path });
      toAdd(path);
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
  let docData;
  let toReadFile = async () => {
    docData = await findDoc({ id: ctx.request.body.id });
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
    data: { content: mdStr, ...docData._doc },
  };
});
router.post("/atlas", async (ctx, next) => {
  atlasType = ctx.request.body?.type;
  ctx.response.body = {
    status: 1,
    code: "200",
    data: atlas,
  };
});
router.post("/getAll", async (ctx, next) => {
  var list = await getAll(ctx.request.body);
  var docSize = await getCount();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: { list:list.map((item)=>{
      const {path,_id,__v,...rest} = item._doc;
      return rest
    }), docSize },
  };
});

router.post("/update", SaveDoc);
module.exports = router;
