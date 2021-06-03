const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const auth = require('../middleware/auth')
const ruleController = require('../controllers/ruleController')

router.post('/new', urlencodedParser, auth, ruleController.CreateRule)
router.get('/', auth, ruleController.GetForm)
router.post('/give', urlencodedParser, auth, ruleController.GiveRule)
router.post('/delete/:id', urlencodedParser, auth, ruleController.DeleteRule)

module.exports = router