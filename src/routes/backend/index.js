const router = require("koa-router")();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
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
const { docsDir } = require("../../config/index");
const chokidar = require("chokidar");

router.prefix("/backend");
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


module.exports = router;