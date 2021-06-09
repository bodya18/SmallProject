const User = require('../models/user')
const file = require('../middleware/file')
const RBAC = require('../service/RBAC_Service')

exports.EditPost = function (req, res) {
    if(!req.body) return res.sendStatus(400)
    const id = req.body.id
    
    let filedata = req.file
    if(req.body.name.length < 2){
        req.flash('error', 'Имя должно быть длиннее 2-х символов')
        return res.redirect(`/edit/${id}`)
    }
    if((!filedata) && (file.inFile === true)){
        req.flash('error', 'Аватар пользователя должен быть фотографией')
        return res.redirect(`/edit/${id}`)

    }
        try {
            const user = new User(null, req.body.email, req.body.name, req.body.age, req.file.path, id)
            user.edit()
        } catch {
            const user = new User(null, req.body.email, req.body.name, req.body.age, null, id)
            user.edit()
        }
            res.redirect(`/user/${id}`)
        file.inFile = false
}

exports.GetEditUser = async (req,res) => {

    const rbac = new RBAC
    const UserData = await rbac.user.GetPermEditUsers(req.params.id, req.session.userIden, req.session.Perm);
    if (UserData.perm === false)
        return res.redirect('/')
    res.render('edit.hbs', {
        users: UserData.data, 
        title: 'Редактирование пользователя',
        error: req.flash('error')
    })

}