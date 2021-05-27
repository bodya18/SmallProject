const {Router} =require('express')
const router = Router()
const userController = require('../controllers/user')

router.get('/:id', userController.GetUser)

module.exports = router