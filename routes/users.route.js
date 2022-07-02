const Router = require('express')
const { exampleController } = require('../controllers/example.controller')

const router = Router()

router.get('/', exampleController.showMessage)

module.exports = router