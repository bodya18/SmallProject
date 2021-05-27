const {Router} =require('express')
const router = Router()
const deleteUserController = require('../controllers/delete')

router.post('/:id', deleteUserController.deleteUser)
module.exports = router