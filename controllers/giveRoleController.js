const User = require('../models/user')

exports.giveRole = (req,res)=>{
    const id = req.params.id
    const Role = req.params.role
    
    if(req.session.Role === "SUDO"){
        const user = new User(null, null ,null, null, null, id)
        user.giveRole(Role)
        return res.redirect('/')
    }
    else
        return res.redirect('/')
    
}