const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const urlencodedParser = require('../middleware/urlencodedParser')
const editController = require('../controllers/editController')

const upload = multer({dest:"images"});

router.post('/', urlencodedParser, upload.single("avatarURL"), editController.EditPost)

router.get('/:id', editController.GetEditUser)

module.exports = router