

-- 标题搜索, 正则 的模糊查询

db.docs.find({title:{$regex:".*强化一波.*"}})


--- 排序查询

db.docs.find().sort({date:1}) -- 1: 升序排序 -1: 降序排序

-- 文章搜索

db.docs.find({context:{$regex:".*react.*"}})

-- tag 查询
db.docs.find({tag:{$regex:"front"}})


--- 分页

db.docs.find().limit(3)

db.docs.find().limit(3).skip(1)

db.docs.find().sort({date:1}).limit(3).skip(1)

--- 计数

db.docs.count()

