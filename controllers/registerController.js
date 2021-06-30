const RBAC = require('../service/RBAC_Service')
const mail = require('../middleware/nodemailer')

exports.GetRegister = (req,res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/news')
    else{
        res.render('register.hbs', {
            title: 'Регистрация',
            error: req.flash('error'),
            isRegister: true
        })
    }
    
}

exports.registerLogic = async (req,res) => {
    if(!req.body) return res.sendStatus(400)

    const rbac = new RBAC
    const UserData = await rbac.user.registerLogic(req.body.email, req.body.name, req.body.password, req.body.repeat, req.body.age)

    if (!UserData.isAuth) {
        req.flash('error', UserData.error)
        return res.redirect(`/register`)
    }
    req.session.Perm = []
    req.session.user = UserData.user
    req.session.isAuthenticated = true
    req.session.userIden = UserData.id
    
    req.session.save(err =>{
        if(err){
            throw err
        }
        res.redirect(`/news`)
        mail.acceptAcc(UserData.user.token, UserData.user.email)
    })

}