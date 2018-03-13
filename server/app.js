// 处理css
const csshook = require('css-modules-require-hook/preset');
const koa = require('koa')
const app = new koa()
const server = require('koa-static');
const index = require('./routes/index')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev)
if (!isDev) {
    app.use(server(path.join(__dirname, '../dist/')))
    app.use(index.routes(), index.allowedMethods())
} else {
    const devStatic = require('./util/dev-static')(app)
}

app.listen(3000)

