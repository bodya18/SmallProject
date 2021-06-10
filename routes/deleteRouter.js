const {Router} =require('express')
const router = Router()
const auth = require('../middleware/auth')
const deleteUserController = require('../controllers/deleteController')

router.post('/:id', auth, deleteUserController.deleteUser)
router.post('/avatar/:id', auth, deleteUserController.deleteAvatar)
module.exports = router