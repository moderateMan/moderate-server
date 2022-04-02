const jwtKoa = require('koa-jwt')
const { JWT_SECRET, JWT_IGNORE_PATH } = require('../config/constant')

module.exports = jwtKoa({
    secret: JWT_SECRET,
}).unless({
    // 定义哪些路由忽略 jwt 验证
    path: JWT_IGNORE_PATH,
})
