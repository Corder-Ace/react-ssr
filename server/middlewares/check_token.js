const jwt = require('jsonwebtoken');
const config = require('../config/token')
const checkToken = async (ctx, next) => {
    let token = ctx.header.authorization
    try {
        const token = ctx.header.authorization
        if (token) {
            try {
                let user_info = jwt.verify(token, config.secret)
                ctx.user = {
                    id: user_info.id,
                    permissions: user_info.permissions
                }
            } catch (err) {
                console.log('token验证失败')
            }
        }
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                message: 'token认证失败'
            }
        } else {
            err.status = 404;
            ctx.body = {
                code: 404,
                message: 'token不存在'
            }
        }
    }
}