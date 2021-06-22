const RBAC = require('../service/RBAC_Service')

exports.GetUser = async (req,res) => {
    if (req.params.id === req.session.userIden) {
        const rbac = new RBAC
        const UserData = await rbac.user.GetUser(req.params.id)
        const perm = await rbac.permission.GetAllConnection()
        const rules = await rbac.role.GetRoles()
        return res.render('user.hbs', {
            users: UserData, 
            title: 'Профиль',
            rules_users: perm.rule_user,
            thisUserId: req.params.id,
            rules: rules.rules,
            isUsers: true
        })
    }
    else{
        for (let i = 0; i < req.session.Perm.length; i++) {
            if ((req.session.Perm[i]==='GIVE')) {
                const rbac = new RBAC
                const UserData = await rbac.user.GetUser(req.params.id)
                const perm = await rbac.permission.GetAllConnection()
                const rules = await rbac.role.GetRoles()
                return res.render('user.hbs', {
                    users: UserData, 
                    title: 'Профиль',
                    rules_users: perm.rule_user,
                    rules: rules.rules,
                    thisUserId: req.params.id,
                    isUsers: true
                })
            }
        }
        return res.redirect('/news')
    } 
}
 