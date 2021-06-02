const User = require('../models/user')
const pool = require('../middleware/pool')
const bcrypt = require('bcryptjs')

exports.GetLogin = (req,res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/')
    else{
        res.render('login.hbs', {
            title: 'Вход',
            error: req.flash('error')
        })
    }
    
}

exports.loginLogic = (req,res) => {
    if(!req.body) return res.sendStatus(400)
    
    pool.query('select password, email, name, age, avatarURL, id, role FROM users WHERE email = ?', [req.body.email], async (err,data) =>{

        if (err) return console.log(err)
        if(!data[0]){
            req.flash('error', 'Данного email не существует')
            return res.redirect(`/login`)
        } else {
            let password = data[0].password
            let id = data[0].id
            let email = data[0].email
            let name = data[0].name
            let age = data[0].age
            let role = data[0].role
            let avatarURL = data[0].avatarURL
            const areSame = await bcrypt.compare(req.body.password, password)
            if(!areSame)
            {
                req.flash('error', 'Неверный пароль')
                return res.redirect(`/login`)
            }
            try {
                const user = new User(password, email, name, age, avatarURL, id)
                req.session.user = user
                req.session.isAuthenticated = true
                req.session.userIden = id
                req.session.Role = role
                req.session.save(err =>{
                    if(err){
                        throw err
                    }
                    res.redirect(`/`)
                })
            } catch (e){
                console.log(e)
            }
        }
    })
}