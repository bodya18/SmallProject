const RBAC = require('../service/RBAC_Service')

exports.EditPost = async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    const UserData = await rbac.user.EditPost(req.body.name, req.body.id, req.file, req.body.email, req.body.age);
    await rbac.user.SetSocialNetw(req.body.vk, req.body.instagram, req.body.facebook, req.body.twitter, req.body.GitHub, req.body.telegram, req.body.id)
    if (UserData.perm === true) {
        if(req.file && (req.session.userIden === req.body.id))
            req.session.user.avatarURL = req.file.path
       return res.redirect(`/user/${req.body.id}`)
    } else {
        req.flash('error', UserData.error)
        return res.redirect(`/edit/${req.body.id}`)
    }
}

exports.GetEditUser = async (req,res) => {

    const rbac = new RBAC
    const isUser = await rbac.user.GetUser(req.params.id)
    if(!isUser)
        return res.render('noUser.hbs')
    const UserData = await rbac.user.GetPermEditUsers(req.params.id, req.session.userIden, req.session.Perm);
    if (UserData.perm === false)
        return res.redirect('/')
    const netw = await rbac.user.GetSocialNetw(req.params.id)
    res.render('edit.hbs', {
        users: UserData.data, 
        netw,
        title: 'Редактирование пользователя',
        error: req.flash('error')
    })

}