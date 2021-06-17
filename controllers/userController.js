const RBAC = require('../service/RBAC_Service')

exports.GetUser = async (req,res) => {
    if (req.params.id === req.session.userIden) {
        const rbac = new RBAC
        const UserData = await rbac.user.GetUser(req.params.id)
        return res.render('user.hbs', {
            users: UserData, 
            title: 'Профиль',
            thisUserId: req.params.id,
            isUsers: true
        })
    }
    else{
        for (let i = 0; i < req.session.Perm.length; i++) {
            if ((req.session.Perm[i]==='GIVE')) {
                const rbac = new RBAC
                const UserData = await rbac.user.GetUser(req.params.id)
                return res.render('user.hbs', {
                    users: UserData, 
                    title: 'Профиль',
                    thisUserId: req.params.id,
                    isUsers: true
                })
            }
        }
        return res.redirect('/news')
    } 
}
 