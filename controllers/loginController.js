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

exports.loginLogic = async(req,res) => {
    if(!req.body) return res.sendStatus(400)
    
    pool.query('select password, email, name, age, avatarURL, id FROM users WHERE email = ?', [req.body.email])
        .then(async (data) =>{
            if(!data[0][0]){
                req.flash('error', 'Данного email не существует')
                return res.redirect(`/login`)
            } else {
                let password = data[0][0].password
                let id = data[0][0].id
                let email = data[0][0].email
                let name = data[0][0].name
                let age = data[0][0].age
                let avatarURL = data[0][0].avatarURL
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
                    pool.query(`Select DISTINCT Permissions.permission
                    from Rules, Permissions, users, Rule_Permission, Rule_User 
                    where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id AND users.id = ?`,[id])
                        .then(data => {
                            req.session.Perm = []
                            for(let i = 0;i<data[0].length;i++){
                                req.session.Perm[i] = data[0][i].permission
                            }
                        })
                        .catch(e=>{
                            return console.log(e)
                        })

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
        .catch(e =>{
            return console.log(e)
        })
}