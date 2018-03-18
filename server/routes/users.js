const router = require('koa-router')()
const userModel = require('../lib/mysql');
const md5 = require('md5');
router.prefix('/users')

//注册
router.post('/register', async (ctx, next) => {
    let account = ctx.request.body.account
    let password = md5(ctx.request.body.password)
    const data = [account, password, ctx.request.body.email, ctx.request.body.nick_name]

    await userModel.findUserByAccount(account).then(res => {
        if (res.length) {
            ctx.body = {
                code: 403,
                meesage: '账号已存在'
            }
        } else {
            userModel.insertUser(data).then(res => {

            })
        }
    })
})

//登录
router.post('/login', async (ctx, next) => {
    const data = {
        account: ctx.request.body.account,
        password: ctx.request.body.password
    }

    await userModel.findUserByAccount(data.account).then(res => {
        if (res.length) {
            if (data.password === res[0].password) {

            } else (
                ctx.body = {
                    code: 401,
                    meesage: '账号或密码错误'
                }
            )
        } else {
            ctx.body = {
                code: 402,
                meesage: '此用户不存在'
            }
        }
    })
})

module.exports = router