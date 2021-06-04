const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const auth = require('../middleware/auth')
const ruleController = require('../controllers/ruleController')

router.get('/', auth, ruleController.GetForm)

router.post('/newRole', urlencodedParser, auth, ruleController.CreateRule)
router.post('/newPermission', urlencodedParser, auth, ruleController.CreatePermission)

router.post('/give', urlencodedParser, auth, ruleController.GiveRule)
router.post('/givePermission', urlencodedParser, auth, ruleController.GivePermission)

router.post('/deleteRule/:id', urlencodedParser, auth, ruleController.DeleteRule)
router.post('/deleteFromUser/:id', urlencodedParser, auth, ruleController.DeleteRuleFromUser)
router.post('/deleteFromRule/:id', urlencodedParser, auth, ruleController.DeletePermissionFromUser)
router.post('/deletePermission/:id', urlencodedParser, auth, ruleController.DeletePermission)

module.exports = router