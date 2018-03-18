const response_formatter = async (ctx, next) => {
    //先执行路由
    await next()

    //没有返回数据统一返回
    if (!ctx.body) {
        ctx.body = {
            code: 200,
            message: 'success'
        }
    }
}

module.exports = response_formatter