//Контроллер для проверки работоспособности

const db = require('../config/db.config')

module.exports.exampleController = {
    showMessage: async (req, res) => {
        res.json('Пример удался')
    },
    createUsersData: async (req, res) => {
        db.query("SELECT DATE_FORMAT(regist_date, '%d.%m.%y %h:%m') FROM users WHERE user_id != 1", (err, raws, fields) => {
            if(err) {
                console.log(err)
                res.json(err.message)
            } else {
                console.log(raws)
                res.json(raws)
            }
        })
    }
}