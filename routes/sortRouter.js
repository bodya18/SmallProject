const {Router} =require('express')
const router = Router()
const sortController = require('../controllers/sortController')
const auth = require('../middleware/auth')

router.get('/up/:what', auth, sortController.up)

router.get('/down/:what', auth, sortController.down)

module.exports = router