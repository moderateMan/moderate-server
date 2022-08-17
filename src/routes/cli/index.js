const router = require("koa-router")();
const {
  getCount,
  deleteAll,
  getAll,
  findItem,
  addItem,
} = require("../../db/cli");

router.prefix("/cli");
(async () => {
  const docSize = await getCount();
  if (docSize == 0) {
    addItem({
      id: 1,
      name: 1,
      tag: ["react"],
      npmName: "@moderate-cli/init",
      name: '"@moderate-cli/init"',
    });
  }
})();

// 获取列表信息
router.get("/project/template", async (ctx, next) => {
  const list = await getAll(ctx.request.body);
  const docSize = await getCount();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: {
      list: list.map((item) => {
        const { path, _id, __v, ...rest } = item._doc;
        return { ...rest };
      }),
      total: docSize,
    },
  };
});

module.exports = router;
