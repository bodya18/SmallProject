const express =require('express')
const router = express.Router()
const subscribeController = require('../controllers/subscribeController')
// const urlencodedParser = require('../middleware/urlencodedParser')
const jsonParser = express.json();

router.post('/', jsonParser, subscribeController.Sub)

module.exports = router