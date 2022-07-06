//Главный контроллер регистрации и авторизации ...
const db = require('../config/db.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports.usersController = {
    registUser: async(req, res) => {
        const password = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_NUMBER))
        db.query(`INSERT INTO users( user_name, user_email, user_password ) VALUES("${req.body.name}", "${req.body.mail}", "${password}")`, (err, rows, fields) => {
            if(err) {
                res.json({status: 400, message: err.message})
            } else {
                res.json({status: 200, message: 'Регистрация успешна'})
            }
        })
    },
    loginUser:  async(req, res) => {
        const email = req.body.email
        const password = req.body.password
        db.query(`SELECT user_name, user_email, user_password FROM users WHERE user_email = "${email}"`, async(err, rows, fields) => {
            if(err) {
                res.json({status: 400, message: err.message})
            } else if(rows.length <= 0) {
                res.json({status: 400, message: `Пользователь с email ${email} не зарегистрирован`})
            } else {
                const row = await rows[0]
                if(password) {
                    const valid = await bcrypt.compare(password, row.user_password)
                    console.log(password)
                    if(valid) {
                        const token = jwt.sign({
                            user_name: row.user_name,
                            user_email: row.user_email
                        }, process.env.JWT_SECRET_KEY, {expiresIn: '14d'})
                        res.json({status:200, token: token})
                    } else {
                        res.json({status:400, error: 'Неверный пароль'})
                    }
                } else {
                    res.json({status:400, error: 'Не введен пароль'})
                }
            }
        })
    },
//     editUserDataByToken: (req,res) => {
//         const {newUserName, newUserLastname, newUserEmail, newUserGender}}
//         db.query(UPDATE)
//     }
}