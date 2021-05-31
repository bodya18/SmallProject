const pool = require('../middleware/pool')
const User = require('../models/user')


exports.EditPost = function (req, res) {
    if(!req.body) return res.sendStatus(400)
    const id = req.body.id
    
    let filedata = req.file;
    if(!filedata)
    {
        req.flash('error', 'Аватар пользователя должен быть фотографией')
        return res.redirect(`/edit/${id}`)
    }
    else
    {
        if(req.body.name.length < 2){
            req.flash('error', 'Имя должно быть длиннее 2-х символов')
            return res.redirect(`/edit/${id}`)
        }
        try {
            const user = new User(null, req.body.email, req.body.name, req.body.age, req.file.path, id)
            user.edit()
        } catch {
            const user = new User(null, req.body.email, req.body.name, req.body.age, null, id)
            user.edit()
        }
        function redirect() {
            res.redirect(`/user/${id}`)
        }
        setTimeout(redirect, 200)
    }

    
}

exports.GetEditUser = (req,res) => {
    const id = req.params.id
    if(req.session.userIden === id){
        pool.query('Select * from users where id=?', [id], (err,data) =>{
            if (err) return console.log(err)
            res.render('edit.hbs', {
                users: data[0], 
                title: 'Редактирование пользователя',
                error: req.flash('error')
            })
        })
    }
    else
        return res.redirect('/')
}