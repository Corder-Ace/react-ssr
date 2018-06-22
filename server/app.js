// 处理css
const csshook = require('css-modules-require-hook/preset');
const koa = require('koa');
const app = new koa()
const server = require('koa-static');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const index = require('./routes/index');
const users = require('./routes/users');
const path = require('path');
const jwt = require('koa-jwt')
const config = require('./config/token')
const isDev = process.env.NODE_ENV === 'dev'
const response_formatter = require('./middlewares/response_formatter')

if (!isDev) {
    app.use(server(path.join(__dirname, '../dist/')))
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))
    app.use(json())
    app.use(response_formatter)
    app.use(jwt({ secret: config.secret }).unless({
        path: [/^\/users\/login/]
    }))
    app.use(index.routes(), index.allowedMethods())
} else {
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))
    app.use(json())
    app.use(jwt({ secret: config.secret }).unless({
        path: [/^\/users\/login/]
    }))
    app.use(response_formatter)
    app.use(users.routes(), users.allowedMethods())
    // app.use(index.routes(), index.allowedMethods())
    const devStatic = require('./util/dev-static')(app)
}

app.listen(3000, function () {
    console.log('服务已经启动')
})

