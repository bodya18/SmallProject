const RBAC = require('../service/RBAC_Service')

exports.GetLogin = (req,res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/news')
    else{
        res.render('login.hbs', {
            title: 'Вход',
            error: req.flash('error'),
            isLogin: true
        })
    }
    
}

exports.loginLogic = async(req,res) => {
    if(!req.body) return res.sendStatus(400)

    const rbac = new RBAC
    const UserData = await rbac.user.loginLogic(req.body.email, req.body.password)
    if (!UserData.isAuth) {
        req.flash('error', UserData.error)
        return res.redirect(`/login`)
    }
    
    req.session.user = UserData.user
    req.session.isAuthenticated = UserData.isAuthenticated
    req.session.userIden = UserData.userIden
    req.session.Perm = UserData.Perm
    
    req.session.save(err =>{
        if(err){
            throw err
        }
        res.redirect(`/news`)
    })
}