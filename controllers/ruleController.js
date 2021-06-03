const pool = require('../middleware/pool')
const Rule = require('../models/rule')

exports.CreateRule = function (req, res) {
    if(!req.body) return res.sendStatus(400)
    Rol = req.body.rule
    if(Rol.length<3)
    {
        req.flash('error', 'Роль должна быть больше 2 символов')
        return res.redirect(`/rules`)
    }
    const rule = new Rule(Rol)
    rule.create()
    return res.redirect(`/rules`)
}

exports.GetForm = (req,res) => {
    pool.query('Select * from Rule_User', (err,data) =>{
        if (err) return console.log(err)
        pool.query('Select * from Rules', (err,rule) =>{
            if (err) return console.log(err)
            pool.query('Select * from users', (err, user) =>{
                if (err) return console.log(err)
                res.render('rules.hbs', {
                    rules: rule, 
                    users: user,
                    rules_users: data,
                    title: 'Роли',
                    error: req.flash('error')
                })
            })
            
        })
    })
}

exports.DeleteRule = (req,res) => {
    const id = req.params.id
    console.log(id)
    const rule = new Rule()   
    rule.delete(id)
    return res.redirect('/rules')
}

exports.GiveRule = (req, res) =>{
    const user = req.body.selectNameId
    const rule = req.body.selectRuleId
    const Role = new Rule()
    Role.AddRuleToUser(user,rule)
    return res.redirect('/rules') 
}