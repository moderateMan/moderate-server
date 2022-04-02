/**
 * @description dev 配置
 * @author 闲D阿强
 */
 module.exports = {
     // mongodb 连接配置
     mongodbConf: {
         host: '49.233.107.254',
         port: '27017',
         dbName: 'play',
     },
     // redis 连接配置
     redisConf: {
         port: '6379',
         host: 'moderate-redis',
     },
     docsDir:{
         path:`/Users/johnlee/workSpace/frontEnd/moderate-server/src/docs`
     }
 }
 