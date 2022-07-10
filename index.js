const express = require('express')
const fileUpload = require('express-fileupload')
const connection = require('./config/db.config')

const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('public'))
app.use(require('./routes/users.route'))
app.use(require('./routes/files.route'))

app.get('/test')

app.listen(4000, () => {
    console.log("Сервер работает")
})