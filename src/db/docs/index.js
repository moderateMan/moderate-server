const { Doc,Connection } = require("./model.js");
const {conn} = require("../index")
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.GetDoc = async (ctx, next) => {
  let toReadFile = () => {
    const path = ctx.request.body.path;
    return new Promise((res, req) => {
      fs.readFile(path, (err, data) => {
        mdStr = data.toString();
        res("异步");
      });
    });
  };
  await toReadFile();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: mdStr,
  };
};

exports.deleteDoc = async (data) => {
  return await Doc.deleteOne(data);
};

exports.addDoc = async (data) => {
  const { path } = data;
  return await Doc.create({ path });
};

exports.deleteAll = async (collectioName) => {
    return await conn.dropCollection(collectioName)
};

exports.getAll = async (data) => {
    return await Doc.find(data);
};

exports.SaveDoc = async (ctx, next) => {
  const id = uuidv4();
  const { name, path } = ctx.request.body || ctx;
  try {
    var save = await addDoc({ id, name, path });
    ctx.session.useInfo = save;
    ctx.body = {
      status: 1,
      code: "200",
      data: save,
    };
  } catch (error) {
    ctx.body = {
      status: 0,
      code: 0,
      data: error,
    };
  }
};

exports.DeleteDoc = async (ctx, next) => {
  const id = uuidv4();
  const { name } = ctx.request.body || ctx;
  try {
    var save = await Doc.deleteOne({ name });
    ctx.body = {
      status: 1,
      code: "200",
      data: save,
    };
  } catch (error) {
    ctx.body = {
      status: 0,
      code: 0,
      data: error,
    };
  }
};

