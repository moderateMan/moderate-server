const { Atlas } = require("./model.js");
const { conn } = require("../index");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


exports.addNode= async (data) => {
  return await Atlas.create(data);
};