/**
 * @description dev 配置
 * @author 闲D阿强
 */
 const path = require('path')
 module.exports = {
     // mongodb 连接配置
     mongodbConf: {
         host: '49.233.107.254',
         port: '27017',
         dbName: 'play',
         user:"play",
         password:"play"
     },
     // redis 连接配置
     redisConf: {
         port: '6379',
         host: 'moderate-redis',
     },
     // 文档资源路径
     docsDir:{
         path:path.resolve('src/docs')
     },
     // 代码资源路径
     codesDir:{
        path:path.resolve('src/codes')
    }
 }
 