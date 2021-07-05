const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const apiController = require('../controllers/apiController')
const isAdmin = require('../middleware/isAdmin')
const jsonParser = express.json()

// router.get('/comments/:id', auth, isAdmin, apiController.GetComm)
// router.get('/users', auth, isAdmin, apiController.GetUsers)
router.post('/comments', jsonParser, apiController.comment)
router.post('/UserSession', apiController.UserSession)

module.exports = router