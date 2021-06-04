const User = require('../models/user')

exports.deleteUser = (req,res)=>{
    const id = req.params.id
    if(req.session.userIden === id){
        const user = new User(null, null ,null, null, null, id)
        user.delete()
        return res.redirect('/logout')
    }
    else{
        for (let i = 0; i < req.session.Perm.length; i++) {
            if (req.session.Perm[i] === "DELETE") {
                is=true
                break;
            }
        }
        if(is){
            const user = new User(null, null ,null, null, null, id)
            user.delete()
            return res.redirect('/')
        }else{
            return res.redirect('/')
        }
    }
    
}