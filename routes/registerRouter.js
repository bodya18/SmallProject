const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const registrController = require('../controllers/registerController')

router.get('/', registrController.GetRegister)

router.post('/', urlencodedParser, registrController.registerLogic)

module.exports = router