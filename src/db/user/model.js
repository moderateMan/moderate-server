const mongoose =  require('mongoose')
const uSchema = new mongoose.Schema({
  password:String,
  name:String
})
 
exports.User = mongoose.model('users',uSchema)
