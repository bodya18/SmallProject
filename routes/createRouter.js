const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const urlencodedParser = require('../middleware/urlencodedParser')
const createUserController = require('../controllers/createController')

const upload = multer({dest:"images"});

router.get('/', createUserController.GetCreate)

router.post('/', urlencodedParser, upload.single("avatarURL"), createUserController.CreateLogic)

module.exports = router