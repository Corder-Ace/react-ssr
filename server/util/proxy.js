import fetch from 'node-fetch'

export default (...args) => {
    return fetch.apply(null,args).then((res) => {
        return res.text()
    })
}