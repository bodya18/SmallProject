const RBAC = require('../service/RBAC_Service')

exports.GetIndex = async (req,res) => {
    const rbac = new RBAC
    const UserData = await rbac.user.GetIndex('time', 'DESC')
    res.render('index.hbs', {
        users: UserData,
        title: 'Список пользователей',
        isAdmin: true,
        isUsers: true
    })
}
