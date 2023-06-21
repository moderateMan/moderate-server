const { Doc } = require("./model.js");
const { conn } = require("../index");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


/**
 * 查询 文章错 mongo文档中
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
exports.queryDoc = async (ctx, next) => {
  // TODO 解析入参
  // ctx.request.body

  var {
    total,
    pageSize,
    pageIndex,
    queryStr
  } = ctx.request.body // 解析 json 格式

  Doc.find({ title: { $regex: queryStr } }).skip(pageIndex - 1 * pageSize).limit(pageSize).sort({ date: 1 })

  ctx.response.body = {
    status: 1, code: "200", data: mdStr,
  };
}



exports.GetDoc = async (ctx, next) => {
  let toReadFile = () => {
    const path = ctx.request.body.path;
    return new Promise((res, req) => {
      fs.readFile(path, (err, data) => {
        mdStr = data?.toString();
        res("");
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

exports.findDoc = async (data) => {
  return await Doc.findOne(data);
};

exports.deleteDoc = async (data) => {
  return await Doc.deleteOne(data);
};

exports.addDoc = async (data) => {
  return await Doc.create(data);
};


exports.deleteAll = async (collectioName) => {
  if (conn.collections[collectioName]) {
    return await conn.collections[collectioName].deleteMany()
  } else {
    return Promise.resolve()
  }
};

exports.getCount = async () => {
  return await Doc.count();
}

exports.getAll = async (data) => {
  const {
    pageSize = 100,
    pageIndex = 1,
    queryStr = ""
  } = data// 解析 json 格式
  return await Doc.find({ title: { $regex: queryStr } }).skip((pageIndex - 1) * pageSize).limit(pageSize).sort({ date: -1 })
};

exports.getAllRemote = async (data) => {
  const {
    pageSize = 100,
    pageIndex = 1,
    queryStr = ""
  } = data// 解析 json 格式
  let response = await Doc.find({ title: { $regex: queryStr } }).skip((pageIndex - 1) * pageSize).limit(pageSize).sort({ date: -1 })
  return response.filter((item) => {
    return item.url
  })
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


exports.addNode = async () => {
  return await Doc.count();
}