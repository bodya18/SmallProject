const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')
const isAdmin = require('../middleware/isAdmin')

router.get('/', auth, isAdmin, adminController.GetAdmin)



module.exports = router