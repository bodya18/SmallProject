const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const auth = require('../middleware/auth')
const ruleController = require('../controllers/ruleController')

router.post('/newRole', urlencodedParser, auth, ruleController.CreateRule)
router.post('/newPermission', urlencodedParser, auth, ruleController.CreatePermission)
router.get('/', auth, ruleController.GetForm)
router.post('/give', urlencodedParser, auth, ruleController.GiveRule)
router.post('/deleteRule/:id', urlencodedParser, auth, ruleController.DeleteRule)
router.post('/deleteFromUser/:id', urlencodedParser, auth, ruleController.DeleteRuleFromUser)
router.post('/deleteFromRule/:id', urlencodedParser, auth, ruleController.DeletePermissionFromUser)
router.post('/givePermission', urlencodedParser, auth, ruleController.GivePermission)

module.exports = router