const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const logoutController = require('../controllers/logoutController')

router.get('/', auth, logoutController.GetLogout)

module.exports = router