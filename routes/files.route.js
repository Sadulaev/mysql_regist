const Router = require('express')
const { filesController } = require('../controllers/files/filesController')

const router = Router()

router.post('/file/:id', filesController.uploadImgByUserId)

module.exports = router