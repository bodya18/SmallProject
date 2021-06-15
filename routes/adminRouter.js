const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')

router.get('/', auth, adminController.GetAdmin)



module.exports = router