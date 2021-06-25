const {Router} =require('express')
const router = Router()
const subscribeController = require('../controllers/subscribeController')
const urlencodedParser = require('../middleware/urlencodedParser')

router.post('/', urlencodedParser, subscribeController.Sub)

module.exports = router