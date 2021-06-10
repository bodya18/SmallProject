const RuleModel = require('../models/rule')
const UserModel = require('../models/user')
const PermissionModel = require('../models/permission')
const ConnectionModel = require('../models/connection')

exports.GetRoles = async (req,res) => {
    var is=false
    for (let i = 0; i < req.session.Perm.length; i++) {
        if (req.session.Perm[i] === "GIVE") {
            is=true
            break;
        }
    }
    if(is){
        const rule = new RuleModel
        const rules = await rule.GetRoles()

        const user = new UserModel
        const users = await user.GetUsers()
        res.render('roles.hbs', {
            rules: rules, 
            users: users,
            title: 'Создание роли',
            error: req.flash('error')
        })

    }else{
        return res.redirect('/')
    }
    
}

exports.GetPermissions = async (req,res) => {
    var is=false
    for (let i = 0; i < req.session.Perm.length; i++) {
        if (req.session.Perm[i] === "GIVE") {
            is=true
            break;
        }
    }
    if(is){
        const rule = new RuleModel
        const rules = await rule.GetRoles()

        const permission = new PermissionModel
        const permissions = await permission.GetPermissions()

        res.render('permissions.hbs', {
            rules: rules, 
            permissions: permissions, 
            title: 'Создание разрешения',
            error: req.flash('error')
        })

    }else{
        return res.redirect('/')
    }
    
}

exports.GetAllConnection = async (req,res) => {
    var is=false
    for (let i = 0; i < req.session.Perm.length; i++) {
        if (req.session.Perm[i] === "GIVE") {
            is=true
            break;
        }
    }
    if(is){
        const connection = new ConnectionModel

        const Alldata = await connection.GetAllConnection()
        const rule_permission = await connection.GetRulePermission()
        const rule_user = await connection.GetRuleUser()

        res.render('rolesConnections.hbs', {
            rules_users: rule_user,
            data: Alldata,
            rules_permissions: rule_permission,
            title: 'Просмотр связей'
        })

    }else{
        return res.redirect('/')
    }
    
}

exports.CreateRule = async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    Rol = req.body.rule
    if(Rol.length<3)
    {
        req.flash('error', 'Роль должна быть больше 2 символов')
        return res.redirect(`/rules/role`)
    }
    const rule = new RuleModel
    await rule.create(Rol)
    return res.redirect(`/rules/role`)
}

exports.DeleteRule = async (req,res) => {
    const id = req.params.id
    const rule = new RuleModel   
    await rule.delete(id)
    return res.redirect('/rules/role')
}

exports.GiveRule = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const user = req.body.selectNameId
    const rule = req.body.selectRuleId
    const connection = new ConnectionModel
    await connection.AddRuleToUser(user, rule)
    return res.redirect('/rules/role') 
}

exports.DeleteRuleFromUser = async (req, res) =>{
    const id = req.params.id
    const connection = new ConnectionModel
    await connection.deleteFromUser(id)
    return res.redirect('/rules') 
}

exports.GivePermission = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const permissionId = req.body.selectPermissionId
    const ruleId = req.body.PermSelectRuleId
    const connection = new ConnectionModel
    await connection.GivePermission(permissionId,ruleId)
    return res.redirect('/rules/permission') 
}

exports.CreatePermission = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    Permission = req.body.NewPermission
    if(Permission.length<3){
        req.flash('error', 'Разрешение должно быть больше 2 символов')
        return res.redirect(`/rules/permission`)
    }
    const perm = new PermissionModel
    await perm.CreatePermission(Permission)
    return res.redirect(`/rules/permission`)
}

exports.DeletePermissionFromUser = async (req, res) =>{
    const id = req.params.id
    const connection = new ConnectionModel
    await connection.DeletePermissionFromRule(id)
    return res.redirect('/rules') 
}

exports.DeletePermission = async (req,res) => {
    const id = req.params.id
    const perm = new PermissionModel  
    await perm.DeletePermission(id)
    return res.redirect(`/rules/permission`)
}