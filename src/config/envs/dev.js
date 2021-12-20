/**
 * @description dev 配置
 * @author 双越
 */
 let devEnvs = require('./dev')
 module.exports = {
     // mongodb 连接配置
     mongodbConf: {
         host: '49.233.107.254',
         port: '27016',
         dbName: 'play',
     },
     // redis 连接配置
     redisConf: {
         port: '6379',
         host: 'moderate-redis',
     },
 }
 