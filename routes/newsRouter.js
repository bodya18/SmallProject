const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const newsController = require('../controllers/newsController')
const urlencodedParser = require('../middleware/urlencodedParser')
const file = require('../middleware/file')

router.get('/', newsController.GetNews)
router.get('/get/:id', newsController.GetThisPost)

router.get('/settings', isAdmin, auth, newsController.GetSettings)
// router.get('/settings/create', isAdmin, auth, newsController.GetCreateSettings)
router.get('/create/post', isAdmin, auth, newsController.GetCreate)
router.get('/edit/:id', isAdmin, auth, newsController.GetEdit)
router.get('/create/category', isAdmin, auth, newsController.GetCreateCategory)
router.get('/categories', isAdmin, auth, newsController.GetCategories)
router.get('/GetEditSettings/:key', isAdmin, auth, newsController.GetEditSettings)


router.post('/editSettings', isAdmin, auth, urlencodedParser, newsController.editSettings)
// router.post('/newSettings', isAdmin, auth, urlencodedParser, newsController.CreateSettings)
router.post('/newCategory', isAdmin, auth, urlencodedParser, newsController.CreateCategory)
router.post('/newPost', isAdmin, auth, urlencodedParser, file.upload.single("postUrl"), newsController.CreateNews)
router.post('/edit', isAdmin, auth, urlencodedParser, file.upload.single("postUrl"), newsController.EditNews)
router.post('/delete/post/:id', isAdmin, auth, urlencodedParser, newsController.DeleteNews)
router.post('/delete/category/:id', isAdmin, auth, urlencodedParser, newsController.DeleteCategory)

module.exports = router