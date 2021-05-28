const User = require('../models/user')

exports.deleteUser = (req,res)=>{
    const id = req.params.id
    const user = new User(null, null ,null, null, null, id)
    user.delete()

    function redirect() {
        res.redirect('/logout')
    }
    setTimeout(redirect, 200)
}