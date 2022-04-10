const mongoose = require("mongoose");
const uSchema = new mongoose.Schema({
  id:String,
  name:String,
  path:String,
  title:String,
  subhead:String,
  cover:String,
  date:String,
  tags:Object,
  author:Object
});

exports.Codes = mongoose.model("codes", uSchema);
