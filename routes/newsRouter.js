const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const newsController = require('../controllers/newsController')
const urlencodedParser = require('../middleware/urlencodedParser')
const file = require('../middleware/file')

router.get('/', newsController.GetNews)
router.get('/create/post', isAdmin, auth, newsController.GetCreate)
router.get('/get/:id', newsController.GetThisPost)
router.get('/edit/:id', isAdmin, auth, newsController.GetEdit)
router.get('/create/category', isAdmin, auth, newsController.GetCreateCategory)
router.get('/categories', isAdmin, auth, newsController.GetCategories)

router.post('/newCategory', isAdmin, auth, isAdmin, urlencodedParser, newsController.CreateCategory)
router.post('/newPost', isAdmin, auth, isAdmin, urlencodedParser, file.upload.single("postUrl"), newsController.CreateNews)
router.post('/edit', isAdmin, auth, urlencodedParser, file.upload.single("postUrl"), newsController.EditNews)
router.post('/delete/post/:id', isAdmin, auth, urlencodedParser, newsController.DeleteNews)
router.post('/delete/category/:id', isAdmin, auth, urlencodedParser, newsController.DeleteCategory)

module.exports = router