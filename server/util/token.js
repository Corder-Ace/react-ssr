const jwt = require('jsonwebtoken')
const config = require('../config/token')

const createToken = (user) => {
    let opts = {
        id: user.id,
        permissions: user.permissions
    }
    
    return jwt.sign(opts, config.secret, { expiresIn: '2h' })
}

module.exports = {
    createToken
}