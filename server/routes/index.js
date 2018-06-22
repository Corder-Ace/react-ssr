const router = require('koa-router')()
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../../dist/server-entry').default
const template = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf8')


router.get('*', async (ctx, next) => {
    const appString = ReactSSR.renderToString(serverEntry)
    console.log(appString)
    ctx.body = template.replace(' <!-- app -->', appString)
})

module.exports = router