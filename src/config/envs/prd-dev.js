/**
 * @description dev 配置
 * @author 闲D阿强
 */
module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'moderate-mongo',
        port: '27017',
        dbName: 'play',
    },
    // redis 连接配置
    redisConf: {
        port: '6379',
        host: 'moderate-redis',
    },
    docsDir:{
        path:`${__dirname}/src/docs`
    }
}
