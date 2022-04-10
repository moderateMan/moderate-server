const { Codes } = require("./model.js");
const { conn } = require("../index");
const collectionName = "codes";

// 添加一个节点数据
exports.addItem = async (data) => {
  return await Codes.create(data);
};

// 删除一个节点数据
exports.deleteItem = async (data) => {
  return await Codes.deleteOne(data);
};

// 获得列表
exports.getAll = async (data={}) => {
  const { pageSize = 100, pageIndex = 1, queryStr = "" } = data; // 解析 json 格式
  return await Codes.find()
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .sort({ date: 1 });
};

// 清空
exports.deleteAll = async () => {
  if (conn.collections[collectionName]) {
    return await conn.collections[collectionName].deleteMany();
  } else {
    return Promise.resolve();
  }
};

// 获得节点信息
exports.findItem = async (data) => {
  return await Codes.findOne(data);
};

// 获得数据数量
exports.getCount = async () => {
  return await Codes.count();
};
