const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken');
const { GetUser, SaveUser } = require('../db/user/index')
const { JWT_SECRET } = require("../config/constant")

router.prefix('/users')

router.post('/login', (ctx, next) => {
  // 示例
  const USER = {
    username: 'zhangsan',
    password: '123456',
    id: 100
  }
  ctx.body = {
    code: 200,
    msg: '登录成功',
    token: jsonwebtoken.sign(
      { name: USER.username, id: USER.id },  // 加密userToken
      JWT_SECRET,
      { expiresIn: '1h' }
    )
  }
})//注册用

router.post('/register', SaveUser)//注册用

router.post('/checkSession', function (ctx, next) {
  if (ctx.session.useInfo) {
    ctx.body = {
      status: 1,
      code: "200",
      data: "yes ok"
    }
  } else {
    ctx.body = 'this is a checkSession response!'
  }
})//注册用

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
