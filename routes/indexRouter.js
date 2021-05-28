const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const indexController = require('../controllers/indexController')

router.get('/', auth, indexController.GetIndex)

module.exports = router