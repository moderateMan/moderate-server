const {Doc, Connection} = require("./model.js");
const {conn} = require("../index")
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

exports.GetDoc = async (ctx, next) => {
    let toReadFile = () => {
        const id = ctx.request.body.id;
        var dirList = fs.readdirSync(process.cwd() + "/src/docs");
        return new Promise((res, req) => {
            fs.readFile(process.cwd() + "/src/docs/test.md", (err, data) => {
                mdStr = data.toString();
                res("异步");
            });
        });
    };
    await toReadFile();
    ctx.response.body = {
        status: 1, code: "200", data: mdStr,
    };
};

exports.deleteDoc = async (data) => {
    return await Doc.deleteOne(data);
};

exports.addDoc = async (data) => {
    const {path} = data;
    return await Doc.create({path});
};


/**
 * regex 解析 文件头部信息
 * 返回 mongo 需要的信息 字段
 * @param data
 * @returns {Promise<*>}
 */
exports.parseDoc = async (path) => {

    var text = '';

    let toReadFile = () => {
        const id = ctx.request.body.id;
        var dirList = fs.readdirSync(process.cwd() + "/src/docs");
        return new Promise((res, req) => {
            fs.readFile(process.cwd() + "/src/docs/test.md", (err, data) => {
                text = data.toString();
                res("异步");
            });
        });
    };
    await toReadFile();

    return await Doc.create({path});

    var text2 = `
<describe>
title: Goland安装
cover: /img/lynk/64.jpg
date:       2020-02-26
subtitle: 工欲善其事必先利其器
tags: Golang

</describe>
arst
`;

    // 先截取  describe 优化后面 匹配性能
    var describe = str.match(/<describe>([\d\D]*?)<\/describe>/)[1]
    // 分别获取 title 等~~
    var title = describe.match(/title:\s*(.*?)\s*\n/)[1]
    var subhead = describe.match(/subhead:\s*(.*?)\s*\n/)[1]
    var cover = describe.match(/cover:\s*(\S*?)\s*\n/)[1]
    var date = describe.match(/date:\s*(\S*?)\s*\n/)[1]
    // TODO tag 支持 多个 >>> 数组
    // var tags = describe.match(/tags:[\d\D]*?- (.*)\s*\n/)[1]
    var tags0 = describe.match(/tags:\s*(\S*?)\s*\n/)[1]


    var desJson = {
        "title": title, "subtitle": subtitle, "cover": cover, "date": date, "tags": [tags0],
    }
    desJson = {
        "title": "golang操作mongodb", "subhead": "工欲善其事必 先利其器", "cover": "/img/lynk/64.jpg\n", "date": "2020-02-26", "tags": ["Golang"],
    }
    return desJson
};


exports.deleteAll = async (collectioName) => {
    return await conn.dropCollection(collectioName)
};

exports.SaveDoc = async (ctx, next) => {
    const id = uuidv4();
    const {name, path} = ctx.request.body || ctx;
    try {
        var save = await addDoc({id, name, path});
        ctx.session.useInfo = save;
        ctx.body = {
            status: 1, code: "200", data: save,
        };
    } catch (error) {
        ctx.body = {
            status: 0, code: 0, data: error,
        };
    }
};

exports.DeleteDoc = async (ctx, next) => {
    const id = uuidv4();
    const {name} = ctx.request.body || ctx;
    try {
        var save = await Doc.deleteOne({name});
        ctx.body = {
            status: 1, code: "200", data: save,
        };
    } catch (error) {
        ctx.body = {
            status: 0, code: 0, data: error,
        };
    }
};

