const Router = require('express')
const { exampleController } = require('../controllers/example.controller')
const { usersController } = require('../controllers/users.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.get('/test', exampleController.createUsersData)
router.post('/post/users', usersController.registUser)
router.post('/login/users', usersController.loginUser)
router.patch('/patch/users/', authMiddleware, usersController.editUserDataByToken)
router.put('/put/users/:id', usersController.editUserById)

module.exports = router