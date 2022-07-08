const Router = require('express')
const { exampleController } = require('../controllers/example.controller')
const { usersController } = require('../controllers/users.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.get('/test', exampleController.createUsersData)
router.post('/user/register', usersController.registUser)
router.post('/user/login', usersController.loginUser)
router.patch('/profile', authMiddleware, usersController.editUserDataByToken)
router.put('/profile/:id', usersController.editUserById)
router.get('/profile/:id', usersController.getUserById)
router.get('/profiles', usersController.getUsersWithPagination)

module.exports = router