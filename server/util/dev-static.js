// import { resolve, reject } from '_any-promise@1.3.0@any-promise';
const serverConfig = require('../../config/webpack.config.server')
const router = require('koa-router')()
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const reactDomServer = require('react-dom/server')
const path = require('path')
const proxy = require('koa-better-http-proxy');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/index.html')
    })
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
}

let serverBundle
const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)

serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename)

    const bundle = mfs.readFileSync(bundlePath, 'utf-8')
    const m = new Module()
    m._compile(bundle, 'server-entry.js')
    serverBundle = m.exports.default
})

module.exports = function (app) {
    app.use(proxy('http://localhost', {
        port: 8888
    }))

    router.get('*', async (ctx, next) => {
        getTemplate.then(template => {
            const content = ReactDOMServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}