//Главный контроллер регистрации и авторизации ...
const db = require('../../config/db.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { isEmail, isName, isPassword } = require('./userdDataValidation')
require('dotenv').config()

module.exports.usersController = {
    registUser: async (req, res) => {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.json({ status: 400, error: "Отсутствуют входные данные" })
        } else if (!isEmail(email)) {
            res.json({ status: 400, error: "Неверный формат электронноый почты" })
        } else if (!isName(name)) {
            res.json({ status: 400, error: "Неверный формат имени пользователя" })
        } else if (!isPassword(password)) {
            res.json({ status: 400, error: "Неверный формат пароля" })
        } else {
            const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_NUMBER))
            db.query(`SELECT user_email FROM users WHERE user_email = "${email}"`, async (err, rows, fields) => {
                if (err) {
                    res.json({ status: 400, error: err })
                } else if (rows != 0) {
                    res.json({ status: 400, error: `Пользователь с email ${email} уже зарегистрирован!` })
                } else {
                    db.query(`INSERT INTO users( user_name, user_email, user_password ) VALUES("${name}", "${email}", "${hash}")`, (err, rows, fields) => {
                        if (err) {
                            res.json({ status: 400, error: err })
                        } else {
                            res.json({ status: 201, message: 'Регистрация прошла успешно' })
                        }
                    })
                }
            })
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            res.json({ status: 400, error: "Почта или пароль не могут быть пустыми" })
        } else {
            db.query(`SELECT user_name, user_email, user_password FROM users WHERE user_email = "${email}"`, async (err, rows, fields) => {
                if (err) {
                    res.json({ status: 400, error: err })
                } else if (rows.length <= 0) {
                    res.json({ status: 404, error: `Пользователь с email ${email} не найден` })
                } else {
                    const row = rows[0]
                    if (password) {
                        const valid = await bcrypt.compare(password, row.user_password)
                        if (valid) {
                            const token = jwt.sign({
                                user_name: row.user_name,
                                user_email: row.user_email
                            }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' })
                            res.json({ status: 201, token: token })
                        } else {
                            res.json({ status: 400, error: 'Неверный пароль' })
                        }
                    } else {
                        res.json({ status: 400, error: 'Не введен пароль' })
                    }
                }
            })
        }
    },
    // Function to edit user's data by token
    editUserDataByToken: (req, res) => {
        const { new_user_name, new_user_lastname, new_user_email, new_user_gender } = req.body
        const current_user_email = req.user.user_email
        if (!new_user_name && !new_user_lastname && !new_user_email && !new_user_gender) {
            res.json({ status: 400, error: "Отсутсвуют входные данные" })
        } else {
            db.query(`SELECT user_name, user_lastname, user_email, user_gender FROM users WHERE user_email = "${current_user_email}"`, (err, rows, fields) => {
                if (err) {
                    res.json({ status: 400, error: err })
                } else if (rows <= 0) {
                    res.json({ status: 401, error: "Ошибка авторизации(ошибка данных токена)" })
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
                            res.json({ status: 201, message: "Замена прошла успешно", new_token: token })
                        } else {
                            res.json({ status: 200, message: "Замена прошла успешно" })
                        }
                    })
                }
            })
        }
    },
    editUserById: (req, res) => {
        const { new_user_name, new_user_lastname, new_user_email, new_user_gender } = req.body
        const user_id = +(req.params.id)
        if (!new_user_name && !new_user_lastname && !new_user_email && !new_user_gender) {
            res.json({ status: 400, error: "Отсутсвуют входные данные" })
        }else if (!isEmail(new_user_email)) {
            res.json({ status: 400, error: "Неверный формат электронноый почты" })
        } else if (!isName(new_user_name)) {
            res.json({ status: 400, error: "Неверный формат имени пользователя" })
        } else {
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
    },
    getUserById: (req, res) => {
        const user_id = +(req.params.id)
        db.query(`SELECT user_name, user_lastname, user_email, user_gender FROM users WHERE user_id = "${user_id}"`, (err, rows, fields) => {
            if (err) {
                res.json({ status: 400, error: err })
            } else if (rows.length <= 0) {
                res.json({ status: 404, error: "Пользователь не найден" })
            } else {
                const row = rows[0]
                res.json({ status: 200, message: "Данные получены успешно", user: row })
            }
        })
    },
    getUsersWithPagination: (req, res) => {
        let pageNumber;
        req.query.page > 0 ? pageNumber = req.query.page : pageNumber = 1
        db.query(`SELECT user_name, user_lastname, user_email, DATE_FORMAT(regist_date, "%d.%m.%y %h:%m") AS regist_date FROM users ORDER BY regist_date LIMIT ${(pageNumber * 10) - 10}, 10`, (err, rows, fields) => {
            if (err) {
                res.json({ status: 400, error: err })
            } else if (rows.length <= 0) {
                res.json({ status: 404, error: 'Пользователи не найдены' })
            } else {
                res.json({ status: 200, message: 'Пользователи найдены', users: rows })
            }
        })
    }
}