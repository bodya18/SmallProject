const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const auth = require('../middleware/auth')
const ruleController = require('../controllers/ruleController')
const isAdmin = require('../middleware/isAdmin')

router.get('/role', isAdmin, auth, ruleController.GetRoles)
router.get('/permission', isAdmin, auth, ruleController.GetPermissions)
router.get('/', isAdmin, auth, ruleController.GetAllConnection)

router.get('/roles/create', isAdmin, auth, ruleController.GetCreateRole)
router.get('/permission/create', isAdmin, auth, ruleController.GetCreatePermission)
router.get('/give/role', isAdmin, auth, ruleController.GetGiveRole)
router.get('/give/permission', isAdmin, auth, ruleController.GetGivePermission)

router.post('/newRole', isAdmin, urlencodedParser, auth, ruleController.CreateRule)
router.post('/newPermission', isAdmin, urlencodedParser, auth, ruleController.CreatePermission)

router.post('/give', isAdmin, urlencodedParser, auth, ruleController.GiveRule)
router.post('/givePermission', isAdmin, urlencodedParser, auth, ruleController.GivePermission)

router.post('/deleteRule/:id', isAdmin, urlencodedParser, auth, ruleController.DeleteRule)
router.post('/deleteFromUser/:id', isAdmin, auth, ruleController.DeleteRuleFromUser)
router.post('/deleteFromRule/:id', isAdmin, auth, ruleController.DeletePermissionFromUser)
router.post('/deletePermission/:id', isAdmin, urlencodedParser, auth, ruleController.DeletePermission)

module.exports = router