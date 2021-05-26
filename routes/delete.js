const {Router} =require('express')
const router = Router()
const User = require('../models/user')

router.post('/:id', (req,res)=>{
    const id = req.params.id
    const user = new User(null, null, null, id)
    user.delete()
    function redirect() {
        res.redirect('/')
    }
    setTimeout(redirect, 200)
})
module.exports = router