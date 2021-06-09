const RBAC = require('../service/RBAC_Service')

exports.up = async (req,res) => {
    const rbac = new RBAC
    const UserData = await rbac.user.GetIndex(req.params.what)
    res.render('index.hbs', {
        users: UserData,
        title: 'Список пользователей'
    })
}

exports.down = async (req,res) => {
    const rbac = new RBAC
    const UserData = await rbac.user.GetIndex(req.params.what, 'DESC')
    res.render('index.hbs', {
        users: UserData,
        title: 'Список пользователей'
    })
}