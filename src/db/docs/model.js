const mongoose =  require('mongoose')
const uSchema = new mongoose.Schema({
  id:Number,
  name:String,
  path:String
})
 
exports.Doc = mongoose.model('docs',uSchema)
exports.Connection =  mongoose.connection
