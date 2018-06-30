// import { resolve, reject } from '_any-promise@1.3.0@any-promise';
const serverConfig = require('../../config/webpack.config.server')
const router = require('koa-router')()
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const reactDomServer = require('react-dom/server')
const path = require('path')
const proxy = require('koa-better-http-proxy');

//获取模板文件
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/index.html')
    })
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
}

let serverBundle, createStoreMap
const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
const NativeModule = require('module');
const vm = require('vm');

const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} }
    const wrapper = NativeModule.wrap(bundle)
    const script = new vm.Script(wrapper, {
        filename: filename,
        displayErrors: true,
    })
    const result = script.runInThisContext()
    result.call(m.exports, m.exports, require, m)
    return m
}

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
    // const m = new Module()
    // m._compile(bundle, 'server-entry.js')
    const m = getModuleFromString(bundle,'server-entry.js')
    serverBundle = m.exports.default //获取dom
    createStoreMap = m.exports.createStoreMap //获取mobx
})

module.exports = function (app) {
    app.use(proxy('http://localhost', {
        port: 8888
    }))

    router.get('*', async (ctx, next) => {
        getTemplate.then(template => {
            const routerContext = {}
            const app = serverBundle(createStoreMap(), routerContext, req.url)
            console.log(app)
            const content = ReactDOMServer.renderToString(app)
            console.log(content)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}