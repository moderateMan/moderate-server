const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa test ci/cd yes!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/project/template', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 获取列表信息
router.post("/api/list", async (ctx, next) => {
  const list = [{ id: 1 }, { id: 2 }]
  ctx.response.body = {
    status: 1,
    code: "200",
    data: {
      list,
    },
  };
});


// 获取列表信息
router.post("/api/login", async (ctx, next) => {
  const list = [{ id: 1 }, { id: 2 }]
  const { name } = ctx.request.body;
  ctx.response.body = {
    status: 1,
    code: "200",
    data: {
      name
    },
  };
});

module.exports = router