const pool = require('../middleware/pool')
const Rule = require('../models/rule')

exports.GetForm = (req,res) => {
    pool.query('Select Rules.rule, Permissions.permission, users.name from Rules, Permissions, users, Rule_Permission, Rule_User where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id', (err, Alldata) =>{
        if (err) return console.log(err)
        pool.query('Select Rules.rule, Permissions.permission, Rule_Permission.id from Rules, Permissions, Rule_Permission where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id', (err, rule_permission) =>{
            if (err) return console.log(err)
            pool.query('Select * from Permissions', (err, permission) =>{
                if (err) return console.log(err)
                pool.query("Select users.name, Rules.rule, Rule_User.id from users, Rule_User, Rules where Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id", (err,data) =>{
                    if (err) return console.log(err)
                    pool.query('Select * from Rules', (err,rule) =>{
                        if (err) return console.log(err)
                        pool.query('Select * from users', (err, user) =>{
                            if (err) return console.log(err)
                            res.render('rules.hbs', {
                                rules: rule, 
                                users: user,
                                rules_users: data,
                                permissions: permission, 
                                data: Alldata,
                                rules_permissions: rule_permission,
                                title: 'Роли',
                                error: req.flash('error')
                            })
                        })
                    })
                })
            })
        })
    })
}

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

exports.DeleteRule = (req,res) => {
    const id = req.params.id
    const rule = new Rule()   
    rule.delete(id)
    return res.redirect('/rules')
}

exports.GiveRule = (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const user = req.body.selectNameId
    const rule = req.body.selectRuleId
    const Role = new Rule()
    Role.AddRuleToUser(user,rule)
    return res.redirect('/rules') 
}

exports.DeleteRuleFromUser = (req, res) =>{
    const id = req.params.id
    const Role = new Rule()
    Role.deleteFromUser(id)
    return res.redirect('/rules') 
}

exports.GivePermission = (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const permissionId = req.body.selectPermissionId
    const ruleId = req.body.PermSelectRuleId
    const Role = new Rule()
    Role.GivePermission(permissionId,ruleId)
    return res.redirect('/rules') 
}

exports.CreatePermission = function (req, res) {
    if(!req.body) return res.sendStatus(400)
    Permission = req.body.NewPermission
    if(Permission.length<3)
    {
        req.flash('error', 'Разрешение должно быть больше 2 символов')
        return res.redirect(`/rules`)
    }
    const perm = new Rule()
    perm.CreatePermission(Permission)
    return res.redirect(`/rules`)
}

exports.DeletePermissionFromUser = (req, res) =>{
    const id = req.params.id
    const Role = new Rule()
    Role.DeletePermissionFromRule(id)
    return res.redirect('/rules') 
}