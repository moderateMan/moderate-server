/**
 * @description dev 配置
 * @author 双越
 */

module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'testdb',
    },

    // redis 连接配置
    redisConf: {
        port: '6379',
        host: '127.0.0.1',
    },
}
