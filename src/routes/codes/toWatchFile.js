const { addItem, deleteItem } = require("../../db/codes");
const { codesDir } = require("../../config/index");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const chokidar = require("chokidar");

//----------------------------------业务代码 start----------------------------------
const dirPath = codesDir;
const Separator = "__"; //文件连接符号
const isInit = process.env.initDoc === "true";

// 存储文件到数据库
const toAdd = async (path) => {
  const itemConfig = require(path)
  const {describe} = itemConfig;
  const strArr = path.split("/");
  const itemName = strArr[strArr.length - 1];
  const pathPrefix = path
    .split("/")
    .slice(0, strArr.length - 1)
    .join("/");

  let id =
    itemName.split(Separator).length > 1 && itemName.split(Separator)[0] ;
  let toReWriteFile = () => {
    return new Promise((res, req) => {
      if (id) {
        res();
      } else {
        id =  uuidv4()
        const newPath = `${pathPrefix}/${id}${Separator}${itemName}`;
        fs.rename(path, newPath, function (err) {
          path = newPath;
          res();
        });
      }
    });
  };
  await toReWriteFile();
  const temp = { id, path,...describe };
  addItem(temp);
  console.log("File", path, "has been added");
};

// 监听文件夹的变化
const toWatchFlies = async () => {
  const watcher = chokidar.watch(dirPath.path, {
    ignored: /[\/\\]\./,
    ignoreInitial: !isInit,
  });

  console.log("test")

  watcher
    .on("add", async function (path) {
      toAdd(path);
    })
    .on("change", async function (path) {
      deleteItem({ path });
      toAdd(path);
      console.log("File", path, "has been change");
    })
    .on("unlink", function (path) {
      deleteItem({ path });
      console.log("File", path, "has been delete");
    });
};

module.exports = {toWatchFlies}
