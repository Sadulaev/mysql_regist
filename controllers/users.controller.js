//Главный контроллер регистрации и авторизации ...
const db = require('../config/db.config')

module.exports.usersController = {
    registUser: (req, res) => {
        db.query(`INSERT INTO users( user_name, user_email, user_password ) VALUES("${req.body.name}", "${req.body.mail}", "${req.body.password}")`, (err, raw, fields) => {
            if(err) {
                res.json({status: 400, message: err.message})
            } else {
                res.json({status: 200, message: 'Регистрация успешна'})
            }
        })
    }
}