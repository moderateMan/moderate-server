const router = require("koa-router")();
const { SaveDoc, GetDoc,addDoc,deleteDoc,deleteAll } = require("../db/docs");
const { docsDir } = require("../config/index");
const chokidar = require("chokidar");
const isInitDoc =  process.env.initDoc === "true"
const toWatchFlies =async ()=>{
  const watcher = chokidar.watch(docsDir.path, {
    ignored: /[\/\\]\./,
    ignoreInitial: !isInitDoc,
  });
  watcher
    .on("add", function (path) {
      addDoc({path})
      console.log("File", path, "has been added");
    })
    .on("unlink", function (path) {
      deleteDoc({path})
      console.log("File", path, "has been delete");
    });
}
if(isInitDoc){
  deleteAll("docs").then(()=>{
    toWatchFlies()
  })
}else{
  toWatchFlies()
}

router.prefix("/docs");
router.post("/getDoc", GetDoc); //注册用

router.post("/update", SaveDoc); //注册用
module.exports = router;
