const Router = require('express')
const { exampleController } = require('../controllers/example.controller')
const { usersController } = require('../controllers/users.controller')

const router = Router()

router.get('/test', exampleController.createUsersData)
router.post('/post/users', usersController.registUser)

module.exports = router