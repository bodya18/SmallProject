const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

router.get('/:id', auth, userController.GetUser)

module.exports = router