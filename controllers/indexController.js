const RBAC = require('../service/RBAC_Service')

exports.GetIndex = async (req,res) => {
    const rbac = new RBAC
    const UserData = await rbac.user.GetIndex('time', 'DESC')
    const perm = await rbac.permission.GetAllConnection()
    res.render('index.hbs', {
        users: UserData,
        rules_users: perm.rule_user,
        title: 'Список пользователей',
        isAdmin: true,
        isUsers: true
    })
}

exports.AcceptAcc = async (req,res) => {
    const rbac = new RBAC
    await rbac.user.SetStatus(req.params.token, 2)
    return res.redirect('/news')
}