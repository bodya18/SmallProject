const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
const jsonParser = express.json()

router.post('/comments', jsonParser, apiController.comment)
router.post('/UserSession', apiController.UserSession)
router.post('/news',jsonParser, apiController.news)
router.post('/newsCategory',jsonParser, apiController.newsCategory)
router.post('/ThisNews', jsonParser, apiController.ThisNews)
router.post('/route', jsonParser, apiController.route)

module.exports = router