const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const urlencodedParser = require('../middleware/urlencodedParser')
const editController = require('../controllers/editController')
const file = require('../middleware/file')
const isAdmin = require('../middleware/isAdmin')

router.post('/', isAdmin, auth, urlencodedParser, file.upload.single("avatarURL"), editController.EditPost)

router.get('/:id', isAdmin, auth, editController.GetEditUser)

module.exports = router