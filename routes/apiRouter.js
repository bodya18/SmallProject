const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const apiController = require('../controllers/apiController')
const isAdmin = require('../middleware/isAdmin')

router.get('/users', auth, isAdmin, apiController.GetUsers)

module.exports = router