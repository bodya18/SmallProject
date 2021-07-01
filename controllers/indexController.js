const RBAC = require('../service/RBAC_Service')
const mail = require('../middleware/nodemailer');

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

exports.recovery = async (req, res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/news')
    return res.render('recovery.hbs',{
        title: 'Забыли пароль?'
    })
}

exports.recoveryPass = async (req, res) =>{
    const rbac = new RBAC
    const token = await rbac.user.recovery(req.body.email)
    res.redirect('/news')
    mail.recoveryPass(req.body.email, token)
}

exports.NewPass = async (req, res) =>{
    if(req.session.isAuthenticated)
        return res.redirect('/news')
    const rbac = new RBAC
    const error = await rbac.user.NewPass(req.params.token)
    res.render('NewPass',{
        title: 'Восстановления пароля',
        error,
        token: req.params.token
    })
}

exports.SetNewPass = async (req, res) =>{
    const rbac = new RBAC
    const data = await rbac.user.setPass(req.body.token, req.body.password)
    if (data) {
        const user = await rbac.user.getByToken(req.body.token)
        await rbac.user.delPassToken(req.body.token)
        res.redirect(`/news`)
        mail.NewPass(user.email)
    }
    else
        return res.redirect(`/news`)
}