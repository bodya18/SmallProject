const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const newsController = require('../controllers/newsController')
const urlencodedParser = require('../middleware/urlencodedParser')
const file = require('../middleware/file')

router.get('/', auth, newsController.GetNews)
router.get('/create', auth, newsController.GetCreate)
router.get('/get/:id', auth, newsController.GetThisPost)
router.post('/newPost', auth, isAdmin, urlencodedParser, file.upload.single("postUrl"), newsController.CreateNews)

module.exports = router