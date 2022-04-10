const Koa = require('koa')

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaSession = require("koa-generic-session")
const cors = require('koa2-cors');
const koaJwt = require("./middlewares/jwt")
const path = require('path')
require('./db/index')
const test = require('./redux-toolkit.cjs.development')
globalThis.toolKita
console.log("admin最新代码！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！",path.resolve('src/docs'))
//路由
const index = require('./routes/index')
const users = require('./routes/users')
const docs = require('./routes/docs')
const codes = require('./routes/codes')

const app = new Koa()

// 解决跨域
app.use(cors({
  origin: function (ctx) {
     return 'https://zero2one.moderate.run/'; 
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public',{
  maxAge:5000000
}))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 中间件对token进行验证
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys=["12312asdasd!@#!@!@"]
app.use(koaSession({
  path:"/",//cookie 在根目录下有效
  httpOnly:true,
  maxAge:24* 60 * 60 * 10000
}))

app.use(koaJwt)

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(docs.routes(), docs.allowedMethods())
app.use(codes.routes(), codes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
