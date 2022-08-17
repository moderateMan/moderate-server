const mongoose = require("mongoose");
const uSchema = new mongoose.Schema({
  id:String,
  name:String,
  tag:Array,
  npmName:String,
  version:String
});

exports.Templates = mongoose.model("template", uSchema);
