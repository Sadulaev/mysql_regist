const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

connection.connect((error) => {
    if(error) {
        return console.log('Ошибка подключения')
    } else {
        return console.log('Подключение успешно')
    }
})

module.exports = connection