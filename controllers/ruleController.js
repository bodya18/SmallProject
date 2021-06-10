const RBAC = require('../service/RBAC_Service')

exports.GetRoles = async (req,res) => {

    const rbac = new RBAC
    const role = await rbac.role.GetRoles(req.session.Perm)

    if(role.isGet)
        res.render('roles.hbs', {
            rules: role.rules, 
            users: role.users,
            title: 'Создание роли',
            error: req.flash('errorRule')
        })
    else
        return res.redirect('/')
}

exports.GetPermissions = async (req,res) => {
    const rbac = new RBAC
    const perm = await rbac.permission.GetPermissions(req.session.Perm)

    if(perm.isGet)
        res.render('permissions.hbs', {
            rules: perm.rules, 
            permissions: perm.permissions, 
            title: 'Создание разрешения',
            error: req.flash('errorPermission')
        })
    else
        return res.redirect('/')
}

exports.GetAllConnection = async (req,res) => {
    const rbac = new RBAC
    const perm = await rbac.permission.GetAllConnection(req.session.Perm)

    if(perm.isGet)
        res.render('rolesConnections.hbs', {
        rules_users: perm.rule_user,
        data: perm.Alldata,
        rules_permissions: perm.rule_permission,
        title: 'Просмотр связей'
    })
    else
        return res.redirect('/')
}

exports.CreateRule = async (req, res) => {
    if(!req.body) return res.sendStatus(400)

    const rbac = new RBAC
    const data = await rbac.role.CreateRule(req.body.rule)

    if(!data.is)
        req.flash('errorRule', data.error)
    return res.redirect(`/rules/role`)
}

exports.DeleteRule = async (req,res) => {
    const rbac = new RBAC
    await rbac.role.DeleteRule(req.params.id)
    return res.redirect('/rules/role')
}

exports.GiveRule = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    await rbac.role.GiveRule(req.body.selectNameId, req.body.selectRuleId)
    return res.redirect('/rules') 
}

exports.DeleteRuleFromUser = async (req, res) =>{
    const rbac = new RBAC
    await rbac.role.DeleteRuleFromUser(req.params.id)
    return res.redirect('/rules') 
}

exports.GivePermission = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    await rbac.permission.GivePermission(req.body.selectPermissionId, req.body.PermSelectRuleId)
    return res.redirect('/rules') 
}

exports.CreatePermission = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    const data = await rbac.permission.CreatePermission(req.body.NewPermission)
    if(!data.is){
        req.flash('errorPermission', data.error)
        return res.redirect(`/rules/permission`)
    }
    return res.redirect(`/rules/permission`)
}

exports.DeletePermissionFromUser = async (req, res) =>{
    const rbac = new RBAC
    await rbac.permission.DeletePermissionFromUser(req.params.id)
    return res.redirect('/rules') 
}

exports.DeletePermission = async (req,res) => {
    const rbac = new RBAC
    await rbac.permission.DeletePermission(req.params.id)
    return res.redirect(`/rules/permission`)
}