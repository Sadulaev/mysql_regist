//Главный контроллер регистрации и авторизации ...
const db = require('../config/db.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const connection = require('../config/db.config')
require('dotenv').config()

module.exports.usersController = {
    registUser: async (req, res) => {
        const { name, email, password } = req.body
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_NUMBER))
        db.query(`INSERT INTO users( user_name, user_email, user_password ) VALUES("${name}", "${email}", "${hash}")`, (err, rows, fields) => {
            if (err) {
                res.json({ status: 400, error: err })
            } else {
                res.json({ status: 200, message: 'Регистрация прошла успешно' })
            }
        })
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body
        db.query(`SELECT user_name, user_email, user_password FROM users WHERE user_email = "${email}"`, async (err, rows, fields) => {
            if (err) {
                res.json({ status: 400, error: err })
            } else if (rows.length <= 0) {
                res.json({ status: 400, message: `Пользователь с email ${email} не найден` })
            } else {
                const row = rows[0]
                if (password) {
                    const valid = await bcrypt.compare(password, row.user_password)
                    if (valid) {
                        const token = jwt.sign({
                            user_name: row.user_name,
                            user_email: row.user_email
                        }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' })
                        res.json({ status: 200, token: token })
                    } else {
                        res.json({ status: 400, error: 'Неверный пароль' })
                    }
                } else {
                    res.json({ status: 400, error: 'Не введен пароль' })
                }
            }
        })
    },
    // Function to edit user's data by token
    editUserDataByToken: (req, res) => {
        const { new_user_name, new_user_lastname, new_user_email, new_user_gender } = req.body
        const current_user_email = req.user.user_email
        db.query(`SELECT user_name, user_lastname, user_email, user_gender FROM users WHERE user_email = "${current_user_email}"`, (err, rows, fields) => {
            if (err) {
                res.json({ status: 400, error: err })
            } else {
                const { user_name, user_lastname, user_gender, user_email } = rows[0]
                db.query(`UPDATE users SET user_name = "${new_user_name || user_name}", user_lastname = "${new_user_lastname || user_lastname}", user_gender = "${new_user_gender || user_gender}", user_email = "${new_user_email || user_email}" WHERE user_email = "${current_user_email}"`, (err, rows, fields) => {
                    if (err) {
                        res.json({ status: 400, error: err })
                    } else if (new_user_name || new_user_email) {
                        const token = jwt.sign({
                            user_name: new_user_name,
                            user_email: new_user_email
                        }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' })
                        res.json({ status: 200, message: "Замена прошла успешно", new_token: token })
                    } else {
                        res.json({ status: 200, message: "Замена прошла успешно" })
                    }
                })
            }
        })
    },
    editUserById: (req, res) => {
        const { new_user_name, new_user_lastname, new_user_email, new_user_gender } = req.body
        const user_id = +(req.params.id)
        db.query(`SELECT user_name, user_lastname, user_email, user_gender FROM users WHERE user_id = "${user_id}"`, (err, rows, fields) => {
            if (err) {
                res.json({ status: 400, error: err })
            } else {
                const { user_name, user_lastname, user_gender, user_email } = rows[0]
                db.query(`UPDATE users SET user_name = "${new_user_name || user_name}", user_lastname = "${new_user_lastname || user_lastname}", user_gender = "${new_user_gender || user_gender}", user_email = "${new_user_email || user_email}" WHERE user_id = "${user_id}"`, (err, rows, fields) => {
                    if (err) {
                        res.json({ status: 400, error: err })
                    } else {
                        res.json({ status: 200, message: "Замена прошла успешно" })
                    }
                })
            }
        })
    }
}