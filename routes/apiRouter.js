const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const apiController = require('../controllers/apiController')
const isAdmin = require('../middleware/isAdmin')
const jsonParser = express.json()
const urlencodedParser = require('../middleware/urlencodedParser')

// router.get('/comments/:id', auth, isAdmin, apiController.GetComm)
// router.get('/users', auth, isAdmin, apiController.GetUsers)
router.post('/comments', jsonParser, apiController.session)

module.exports = router