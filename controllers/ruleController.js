const pool = require('../middleware/pool')
const Rule = require('../models/rule')

exports.GetRoles = (req,res) => {
    var is=false
    for (let i = 0; i < req.session.Perm.length; i++) {
        if (req.session.Perm[i] === "GIVE") {
            is=true
            break;
        }
    }
    if(is){
        pool.query('Select * from Rules', (err,rule) =>{
            if (err) return console.log(err)
            pool.query('Select * from users', (err, user) =>{
                if (err) return console.log(err)
                res.render('roles.hbs', {
                    rules: rule, 
                    users: user,
                    title: 'Создание роли',
                    errorRole: req.flash('errorRole'),
                    errorRoleDel: req.flash('errorRoleDel')
                })
            })
        })
    }else{
        return res.redirect('/')
    }
    
}

exports.GetPermissions = (req,res) => {
    var is=false
    for (let i = 0; i < req.session.Perm.length; i++) {
        if (req.session.Perm[i] === "GIVE") {
            is=true
            break;
        }
    }
    if(is){
        pool.query('Select * from Permissions', (err, permission) =>{
            if (err) return console.log(err)
            pool.query('Select * from Rules', (err,rule) =>{
                if (err) return console.log(err)
                res.render('permissions.hbs', {
                    rules: rule, 
                    permissions: permission, 
                    title: 'Создание разрешения',
                    errorPermission: req.flash('errorPermission')
                })
            })
        })
    }else{
        return res.redirect('/')
    }
    
}

exports.GetAllConnection = (req,res) => {
    var is=false
    for (let i = 0; i < req.session.Perm.length; i++) {
        if (req.session.Perm[i] === "GIVE") {
            is=true
            break;
        }
    }
    if(is){
        pool.query('Select Rules.rule, Permissions.permission, users.name from Rules, Permissions, users, Rule_Permission, Rule_User where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id', (err, Alldata) =>{
            if (err) return console.log(err)
            pool.query('Select Rules.rule, Permissions.permission, Rule_Permission.id from Rules, Permissions, Rule_Permission where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id', (err, rule_permission) =>{
                if (err) return console.log(err)
                pool.query("Select users.name, Rules.rule, Rule_User.id from users, Rule_User, Rules where Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id", (err,data) =>{
                    if (err) return console.log(err)
                    res.render('rolesConnections.hbs', {
                        rules_users: data,
                        data: Alldata,
                        rules_permissions: rule_permission,
                        title: 'Просмотр связей'
                    })
                })
            })
        })
    }else{
        return res.redirect('/')
    }
    
}

exports.CreateRule = function (req, res) {
    if(!req.body) return res.sendStatus(400)
    Rol = req.body.rule
    if(Rol.length<3)
    {
        req.flash('errorRole', 'Роль должна быть больше 2 символов')
        return res.redirect(`/rules/role`)
    }
    const rule = new Rule(Rol)
    rule.create()
    return res.redirect(`/rules/role`)
}

exports.DeleteRule = (req,res) => {
    const id = req.params.id
    const rule = new Rule()   
    rule.delete(id)
    pool.query('select * from Rules where id=?', [id], (err, data) =>{
        if(data){
            req.flash('errorRoleDel', 'Удалите все связи ролей с польователем и разрешением')
        }
    })
    return res.redirect('/rules/role')
}

exports.GiveRule = (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const user = req.body.selectNameId
    const rule = req.body.selectRuleId
    const Role = new Rule()
    Role.AddRuleToUser(user, rule)
    return res.redirect('/rules/role') 
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
    return res.redirect('/rules/permission') 
}

exports.CreatePermission = function (req, res) {
    if(!req.body) return res.sendStatus(400)
    Permission = req.body.NewPermission
    if(Permission.length<3)
    {
        req.flash('errorPermission', 'Разрешение должно быть больше 2 символов')
        return res.redirect(`/rules/permission`)
    }
    const perm = new Rule()
    perm.CreatePermission(Permission)
    return res.redirect(`/rules/permission`)
}

exports.DeletePermissionFromUser = (req, res) =>{
    const id = req.params.id
    const Role = new Rule()
    Role.DeletePermissionFromRule(id)
    return res.redirect('/rules') 
}

exports.DeletePermission = (req,res) => {
    const id = req.params.id
    const rule = new Rule()   
    rule.DeletePermission(id)
    pool.query('select * from Permissions where id=?', [id], (err, data) =>{
        if(data){
            req.flash('errorPermission', 'Удалите все связи разрешения с ролями')
        }
    })
    return res.redirect('/rules/permission')
}