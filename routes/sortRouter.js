const {Router} =require('express')
const router = Router()
const sortController = require('../controllers/sortController')


router.get('/up/:what', sortController.up)

router.get('/down/:what', sortController.down)

module.exports = router