const { User } = require('./model.js')

exports.GetUser = async (ctx, next) => {
    const password = ctx.query.password;
    let data = await User.findOne({
        password: password
    })
    ctx.body = {
        status: data ? 1 : 0,
        data: data
    }
}

exports.SaveUser = async (ctx, next) => {
    const password = ctx.request.body.password;
    const name = ctx.request.body.name;
    
    if (!password || !name) return ctx.body = { status: 0, message: "邮箱错误" }

    let data = await User.findOne({
        name: name
    })
    if (data) {
        ctx.body = {
            status: 0,
            data: "用户已存在"
        }
    } else {
        try {
            var save = await User.create({ "password": password, "name": name });
            ctx.session.useInfo = save
            ctx.body = {
                status: 1,
                code:"200",
                data: save
            }
        } catch (error) {
            ctx.body = {
                status: 0,
                code:0,
                data: error
            }
        }
    }
}
