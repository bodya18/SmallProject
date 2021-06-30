const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const indexController = require('../controllers/indexController')
const isAdmin = require('../middleware/isAdmin')

router.get('/', isAdmin, auth, indexController.GetIndex)
router.get('/accept/:token', auth, indexController.AcceptAcc)

module.exports = router