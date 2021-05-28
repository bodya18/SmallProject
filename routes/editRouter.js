const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const auth = require('../middleware/auth')
const urlencodedParser = require('../middleware/urlencodedParser')
const editController = require('../controllers/editController')

const upload = multer({dest:"images"});

router.post('/', auth, urlencodedParser, upload.single("avatarURL"), editController.EditPost)

router.get('/:id', auth, editController.GetEditUser)

module.exports = router