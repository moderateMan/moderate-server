const router = require("koa-router")();
const path = require('path')
const fs = require("fs");
const { getCount, deleteAll, getAll, findItem } = require("../../db/codes");
const { toWatchFlies } = require("./toWatchFile");

router.prefix("/codes");
const isInit = process.env.initDoc === "true";

//判断是否初始化
if (isInit) {
  deleteAll().then(() => {
    toWatchFlies();
  });
} else {
  toWatchFlies();
}

// 获取列表信息
router.post("/list", async (ctx, next) => {
  const list = await getAll(ctx.request.body);
  const docSize = await getCount();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: {
      list: list.map((item) => {
        const { path,_id,__v,...rest } = item._doc;
        return {...rest};
      }),
      total: docSize,
    },
  };
});

//获得item信息
router.post("/getItem", async (ctx, next) => {
  let docData;
  let toReadFile = async () => {
    docData = await findItem({ id: ctx.request.body.id });
    return new Promise((res, req) => {
      let a = path.resolve(docData.path)
      let c = __dirname
      const temp = require(a)
      mdStr = temp;
      res("");
    });
  };
  await toReadFile();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: { ...mdStr,id :ctx.request.body.id},
  };
});

//获得item信息
router.post("/getDefaultItem", async (ctx, next) => {
  let docData;
  let id;
  let toReadFile = async () => {
    const list = await getAll();
    id = list[0].id
    docData = await findItem({ id});
    return new Promise((res, req) => {
      const temp = require(path.resolve(docData.path))
      mdStr = temp;
      res("");
    });
  };
  await toReadFile();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: { ...mdStr,id},
  };
});

module.exports = router;
