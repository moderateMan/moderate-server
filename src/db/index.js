const mongoose = require('mongoose');
const { mongodbConf } = require('../config/index')
const {dbName,host,port} = mongodbConf;
const db = `mongodb://play:play@${host}:${port}` //mongoose 地址
mongoose.connect(db,{
    useNewUrlParser:true,
    dbName:dbName
})
//链接mongoose

const conn = mongoose.connection;
conn.on("connected",()=>{
    console.log("mongo ok");
})
conn.on("error",err =>{
    console.error("mongo error"+ err)
})

exports.conn = conn;
