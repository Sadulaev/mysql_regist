const db = require('../../config/db.config')
const path = require('path')
const fs = require('fs')

module.exports.filesController = {
    uploadImgByUserId: async (req, res) => {
        try {
            const img = req.files.img
            const user_id = req.params.id
            const newImgName = [...img.name.split('.').slice(0, -1), user_id, img.name.split('.').slice(-1)].join('.')
            img.name = newImgName
            const imgDir = path.resolve('assets/usersImages')
            if (!img) {
                res.json({ status: 400, error: "Ошибка загрузки изображения" })
            } else if (!user_id) {
                res.json({ status: 400, error: "Ошибка авторизации" })
            } else if (img.size >= 1000000) {
                res.json({ status: 400, error: "Изображение весит более 10Мб" })
            } else {
                db.query(`SELECT img_path FROM users WHERE user_id=${user_id}`, (err, rows, fields) => {
                    if (err) {
                        res.json({ status: 400, error: err })
                    } else if (rows.length <= 0) {
                        res.json({ status: 404, error: "Ошибка авторизации пользователя" })
                    } else {
                        const current_img_path = rows[0].img_path
                        if (current_img_path) {
                            fs.unlinkSync(`${imgDir}\\${current_img_path}`)
                        }
                        db.query(`UPDATE users SET img_path="${img.name}" WHERE user_id=${user_id}`, (err, rows, fields) => {
                            if (err) {
                                res.json({ status: 400, error: err })
                            } else {
                                img.mv(`${imgDir}\\${img.name}`)
                                res.json({ status: 200, message: "Новое изображение загружено и присвоено" })
                            }
                        })
                    }
                })
            }
        } catch (e) {
            console.log(e)
            res.json({ status: 400, error: e })
        }
    }
}