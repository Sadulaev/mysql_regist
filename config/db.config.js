const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit: 2,
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

module.exports = pool