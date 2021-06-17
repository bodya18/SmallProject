const {Router} = require('express')
const router = Router()
const sortController = require('../controllers/sortController')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

router.get('/up/:what', isAdmin, auth, sortController.up)

router.get('/down/:what', isAdmin, auth, sortController.down)

module.exports = router