const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const indexController = require('../controllers/indexController')
const isAdmin = require('../middleware/isAdmin')
const urlencodedParser = require('../middleware/urlencodedParser');

router.get('/', isAdmin, auth, indexController.GetIndex)
router.get('/accept/:token', auth, indexController.AcceptAcc)
router.get('/recoveryPass', indexController.recovery)
router.get('/recovery/:token', indexController.NewPass)

router.post('/newPass', urlencodedParser, indexController.SetNewPass)
router.post('/recovery', urlencodedParser, indexController.recoveryPass)

module.exports = router