const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')
const isAdmin = require('../middleware/isAdmin')

router.get('/', auth, isAdmin, adminController.GetAdmin)

module.exports = router