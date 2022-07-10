const Router = require('express')
const { usersController } = require('../controllers/users/users.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/user/register', usersController.registUser)
router.post('/user/login', usersController.loginUser)
router.patch('/profile', authMiddleware, usersController.editUserDataByToken)
router.put('/profile/:id', usersController.editUserById)
router.get('/profile/:id', usersController.getUserById)
router.get('/profiles', usersController.getUsersWithPagination)

module.exports = router