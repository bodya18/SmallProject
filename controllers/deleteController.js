const RBAC = require('../service/RBAC_Service')

exports.deleteUser = async (req,res)=>{
    const rbac = new RBAC
    const UserData = await rbac.user.deleteUser(req.params.id, req.session.userIden, req.session.Perm)
    if(UserData.isAcс === false)
        return res.redirect('/')
    else
        return res.redirect('/logout')
    
}