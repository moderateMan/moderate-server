const router = require('koa-router')()
const {GetUser,SaveUser} = require('../db/user/index')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/register',SaveUser)//注册用

router.post('/checkSession',function (ctx, next) {
  if(ctx.session.useInfo){
    ctx.body = {
      status: 1,
      code:"200",
      data: "yes ok"
    }
  }else{
    ctx.body = 'this is a checkSession response!'
  }
})//注册用

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
