const express = require('express')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

connection.connect(function(err) {
    if (err) {
        return console.log("Ошибка:" + err.message)
    } else {
        console.log("Подключение прошло успешно")
    }
})

connection.end(function(err) {
    if(err) {
        return console.log("Ошбка" + err.message)
    }
    console.log("Закрыто")
})

app.listen(4000, () => {
    console.log("Сервер работает")
})