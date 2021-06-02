const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const giveRoleController = require('../controllers/giveRoleController')

router.post('/:id/:role', auth, giveRoleController.giveRole)
module.exports = router