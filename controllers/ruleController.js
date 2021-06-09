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
        pool.query('Select * from Rules')
            .then(rule => {
                pool.query('Select * from users')
                    .then(user => {
                        res.render('roles.hbs', {
                            rules: rule[0], 
                            users: user[0],
                            title: 'Создание роли',
                            error: req.flash('error')
                        })
                    })
                    .catch(e =>{
                        return console.log(e);
                    })
            })
            .catch(e =>{
                return console.log(e);
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
        pool.query('Select * from Permissions')
            .then(permission =>{
                pool.query('Select * from Rules')
                    .then(rule =>{
                        res.render('permissions.hbs', {
                            rules: rule[0], 
                            permissions: permission[0], 
                            title: 'Создание разрешения',
                            error: req.flash('error')
                        })
                    })
                    .catch(e =>{
                        return console.log(e);
                    })
            })
            .catch(e =>{
                return console.log(e);
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
        pool.query('Select Rules.rule, Permissions.permission, users.name from Rules, Permissions, users, Rule_Permission, Rule_User where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id')
            .then(Alldata =>{
                pool.query('Select Rules.rule, Permissions.permission, Rule_Permission.id from Rules, Permissions, Rule_Permission where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id')
                    .then(rule_permission =>{
                        pool.query("Select users.name, Rules.rule, Rule_User.id from users, Rule_User, Rules where Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id")
                            .then(data =>{
                                res.render('rolesConnections.hbs', {
                                    rules_users: data[0],
                                    data: Alldata[0],
                                    rules_permissions: rule_permission[0],
                                    title: 'Просмотр связей'
                                })
                            })
                            .catch(e =>{
                                return console.log(e);
                            })
                    })
                    .catch(e =>{
                        return console.log(e);
                    })
            })
            .catch(e =>{
                return console.log(e);
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
        req.flash('error', 'Роль должна быть больше 2 символов')
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
    if(Permission.length<3){
        req.flash('error', 'Разрешение должно быть больше 2 символов')
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
    return res.redirect(`/rules/permission`)
}