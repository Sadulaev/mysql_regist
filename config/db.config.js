const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

connection.query( 'CREATE DATABASE IF NOT EXISTS users', (err, raw, fields) => {
    if(err) {
        return console.log('Ошибка:' + err.message)
    } else {
        console.log("Создание таблицы прошло успешно")
    }
})

connection.connect((error) => {
    if(error) {
        return console.log('Ошибка подключения')
    } else {
        return console.log('Подключение успешно')
    }
})

module.exports = connection