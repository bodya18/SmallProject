const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const loginController = require('../controllers/loginController')

router.get('/', loginController.GetLogin)

router.post('/', urlencodedParser, loginController.loginLogic)

module.exports = router