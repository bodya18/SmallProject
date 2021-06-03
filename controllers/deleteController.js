const User = require('../models/user')

exports.deleteUser = (req,res)=>{
    const id = req.params.id
    if(req.session.userIden === id){
        const user = new User(null, null ,null, null, null, id)
        user.delete()
        return res.redirect('/logout')
    }
    else
        return res.redirect('/')
    
}