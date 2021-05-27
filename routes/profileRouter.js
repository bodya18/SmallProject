const {Router} =require('express')
const router = Router()
const userController = require('../controllers/userController')

router.get('/:id', userController.GetUser)

module.exports = router