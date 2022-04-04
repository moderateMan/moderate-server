const mongoose =  require('mongoose')
const uSchema = new mongoose.Schema({
  level: Number,
  id:String,
  name:String,
  tags:Array,
  childrenNum:Number
})
 
exports.Atlas = mongoose.model('atlas',uSchema)
// exports.Connection =  mongoose.connection.dropCollection('atlas')
