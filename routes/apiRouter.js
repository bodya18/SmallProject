const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
const jsonParser = express.json()

router.get('/photo/:id', apiController.photo)

router.post('/comments', jsonParser, apiController.comment)
router.post('/UserSession', apiController.UserSession)
router.post('/news',jsonParser, apiController.news)
router.post('/newsCategory',jsonParser, apiController.newsCategory)
router.post('/ThisNews', jsonParser, apiController.ThisNews)
router.post('/search', jsonParser, apiController.search)
router.post('/GetNewsById', jsonParser, apiController.GetNewsById)
router.post('/GetNewsByCategoryId', jsonParser, apiController.GetNewsByCategoryId)

module.exports = router