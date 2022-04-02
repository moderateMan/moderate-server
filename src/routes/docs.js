const router = require("koa-router")();
const { SaveDoc, GetDoc,addDoc,deleteDoc,deleteAll,getAll } = require("../db/docs");
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
      //TODO 解析md文档中描述describe
      addDoc({path})
      console.log("File", path, "has been added");
    })
    .on("change", function (path) {
      deleteDoc({path})
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
router.post("/list", async (ctx, next)=>{

}); 
router.post("/getDoc", GetDoc); 
router.post("/getAll", async (ctx, next)=>{
  var save = await getAll();
  ctx.response.body = {
    status: 1,
    code: "200",
    data: save,
  };
}); 


router.post("/update", SaveDoc); //注册用
module.exports = router;
