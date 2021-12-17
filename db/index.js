const mongoose = require('mongoose');
const db = 'mongodb://play:play@49.233.107.254:27017/?authSource=admin' //mongoose 地址
mongoose.connect(db,{
    useNewUrlParser:true,
    dbName:"play"
})
//链接mongoose
 

const conn = mongoose.connection;
conn.on("connected",()=>{
    console.log("mongo ok");
})
conn.on("error",err =>{
    console.error("mongo error"+ err)
})
