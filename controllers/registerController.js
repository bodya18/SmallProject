const { v4: uuidv4 } = require('uuid');
const User = require('../models/user')
const pool = require('../middleware/pool')
const bcrypt = require('bcryptjs')

exports.GetRegister = (req,res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/')
    else{
        res.render('register.hbs', {
            title: 'Регистрация',
            error: req.flash('error')
        })
    }
    
}

exports.registerLogic = (req,res) => {
    if(!req.body) return res.sendStatus(400)
    const id = uuidv4()
    
    pool.query('select email FROM users WHERE email = ?', [req.body.email])
        .then(async (data) =>{
            if(data[0][0]){
                req.flash('error', 'Данный email уже зарегистрирован')
                return res.redirect(`/register`)
            } else {

                if(req.body.name.length < 2){
                    req.flash('error', 'Имя меньше 2-х символов')
                    return res.redirect(`/register`)
                }
                if(req.body.age < 1)
                {
                    req.flash('error', 'Введите настоящий возраст')
                    return res.redirect(`/register`)
                }
                if(req.body.password.length < 6)
                {
                    req.flash('error', 'Пароль должен быть больше 6 символов')
                    return res.redirect(`/register`)
                }
                if(req.body.password !== req.body.repeat)
                {
                    req.flash('error', 'Пароли должны совпадать')
                    return res.redirect(`/register`)
                }
                const hashPassword = await bcrypt.hash(req.body.password, 10)
                const user = new User(hashPassword, req.body.email, req.body.name, req.body.age, null, id)
                user.create()
                return res.redirect(`/login`)
            }
        })
        .catch(e =>{
            return console.log(e)
        })
}