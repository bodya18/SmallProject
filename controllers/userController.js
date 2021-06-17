const RBAC = require('../service/RBAC_Service')

exports.GetUser = async (req,res) => {
    const rbac = new RBAC
    const UserData = await rbac.user.GetUser(req.params.id)
    res.render('user.hbs', {
        users: UserData, 
        title: 'Профиль',
        thisUserId: req.params.id,
        isUsers: true
    })
}
 