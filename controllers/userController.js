const RBAC = require('../service/RBAC_Service')

exports.GetUser = async (req,res) => {
    const rbac = new RBAC
    const UserData = await rbac.user.GetUser(req.params.id)
    if(!UserData)
        return res.render('noUser.hbs')
    if (req.params.id === req.session.userIden) {

        const netw = await rbac.user.GetSocialNetw(req.params.id)

        const perm = await rbac.permission.GetAllConnection()
        const rules = await rbac.role.GetRoles()
        var SelectRoles = await rbac.role.GetUserRoles(req.params.id)
        var a = []
        for (let i = 0; i < SelectRoles.rules.length; i++) {
            for (let j = 0; j < SelectRoles.users.length; j++) {
                if (SelectRoles.rules[i].id === SelectRoles.users[j].ruleId){
                    a.push(SelectRoles.rules[i])
                }
            }
        }
        for (let i = 0; i < SelectRoles.rules.length; i++) {
            for (let j = 0; j < a.length; j++) {
                if(a[j].id === SelectRoles.rules[i].id)
                    SelectRoles.rules.splice(i, 1)
            }
        }
        return res.render('user.hbs', {
            users: UserData, 
            title: 'Профиль',
            SelectRules: a,
            netw,
            NonSelectRules: SelectRoles.rules,
            rules_users: perm.rule_user,
            thisUserId: req.params.id,
            rules: rules.rules,
            isUsers: true
        })
    }
    else{
        for (let i = 0; i < req.session.Perm.length; i++) {
            if ((req.session.Perm[i]==='GIVE')) {

                const netw = await rbac.user.GetSocialNetw(req.params.id)

                const perm = await rbac.permission.GetAllConnection()
                const rules = await rbac.role.GetRoles()

                var SelectRoles = await rbac.role.GetUserRoles(req.params.id)
                var a = []
                for (let i = 0; i < SelectRoles.rules.length; i++) {
                    for (let j = 0; j < SelectRoles.users.length; j++) {
                        if (SelectRoles.rules[i].id === SelectRoles.users[j].ruleId){
                            a.push(SelectRoles.rules[i])
                        }
                    }
                }
                for (let i = 0; i < SelectRoles.rules.length; i++) {
                    for (let j = 0; j < a.length; j++) {
                        if(a[j].id === SelectRoles.rules[i].id)
                            SelectRoles.rules.splice(i, 1)
                    }
                }
                return res.render('user.hbs', {
                    users: UserData, 
                    title: 'Профиль',
                    SelectRules: a,
                    netw,
                    NonSelectRules: SelectRoles.rules,
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
 