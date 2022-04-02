const mongoose =  require('mongoose')
const uSchema = new mongoose.Schema({
  id:Number,
  name:String,
  path:String,
  title:String,
  subhead:String,
  cover:String,
  date:String,
  tags:Object,
})
 
exports.Doc = mongoose.model('docs',uSchema)
exports.Connection =  mongoose.connection.dropCollection('docs')
