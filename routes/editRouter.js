const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const auth = require('../middleware/auth')
const urlencodedParser = require('../middleware/urlencodedParser')
const editController = require('../controllers/editController')

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({
    dest:"images",
    fileFilter: fileFilter});

router.post('/', auth, urlencodedParser, upload.single("avatarURL"), editController.EditPost)

router.get('/:id', auth, editController.GetEditUser)

module.exports = router