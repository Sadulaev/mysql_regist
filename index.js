const express = require('express')
const connection = require('./config/db.config')

const app = express()

app.use(express.json())
app.use(require('./routes/users.route'))

app.get('/test')

app.listen(4000, () => {
    console.log("Сервер работает")
})