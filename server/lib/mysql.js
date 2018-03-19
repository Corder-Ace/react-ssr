const mysql = require('mysql')
const config = require('../config/default')

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

//注册
const insertUser = (account,password) =>{
    let _sql = `insert into user_info(account,password,email,nick_name) values(?,?,?,?)`
    return query(_sql)
}

//登录认证
const findUserByAccount = (account) => {
    let _sql = `select * from user_info where account="${account}"`
    return query(_sql)
}

module.exports = {
    insertUser,
    findUserByAccount
}