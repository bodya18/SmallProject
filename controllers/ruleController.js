const RBAC = require('../service/RBAC_Service')

exports.GetRoles = async (req,res) => {

    const rbac = new RBAC
    const role = await rbac.role.GetRoles(req.session.Perm)

    if(role.isGet)
        res.render('roles.hbs', {
            rules: role.rules,
            title: 'Список ролей',
            isAdmin: true,
            isRole: true
        })
    else
        return res.redirect('/')
}

exports.GetCreateRole = async (req, res) => {
    res.render('CreateRole.hbs', {
        title: 'Создание роли',
        isAdmin: true,
        isRoleCreate: true,
        error: req.flash('error')
    })
}

exports.GetCreatePermission = async (req, res) => {
    res.render('CreatePermission.hbs', {
        title: 'Создание разрешения',
        isAdmin: true,
        isPermissionCreate: true,
        error: req.flash('error')
    })
}

exports.GetGiveRole = async (req, res) => {
    const rbac = new RBAC
    const role = await rbac.role.GetRoles(req.session.Perm)
    res.render('GiveRole.hbs', {
        rules: role.rules, 
        users: role.users,
        title: 'Выдача роли',
        isAdmin: true,
        isGiveRole: true,
        error: req.flash('error')
    })
}

exports.GetGivePermission = async (req, res) => {
    const rbac = new RBAC
    const perm = await rbac.permission.GetPermissions(req.session.Perm)
    res.render('GivePermission.hbs', {
        rules: perm.rules, 
        permissions: perm.permissions, 
        title: 'Выдача разрешения',
        isAdmin: true,
        isGivePermission: true,
        error: req.flash('error')
    })
}

exports.GetPermissions = async (req,res) => {
    const rbac = new RBAC
    const perm = await rbac.permission.GetPermissions(req.session.Perm)

    if(perm.isGet)
        res.render('permissions.hbs', {
            permissions: perm.permissions, 
            title: 'Список разрешений',
            error: req.flash('error'),
            isAdmin: true,
            isPermission: true
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
        title: 'Просмотр связей',
        isAdmin: true,
        isConnection: true
    })
    else
        return res.redirect('/')
}

exports.CreateRule = async (req, res) => {
    if(!req.body) return res.sendStatus(400)

    const rbac = new RBAC
    const data = await rbac.role.CreateRule(req.body.rule)

    if(!data.is)
        req.flash('error', data.error)
    return res.redirect(`/rules/role`)
}

exports.DeleteRule = async (req,res) => {
    const rbac = new RBAC
    const data = await rbac.role.DeleteRule(req.params.id)
    if(data !== undefined)
        req.flash('error', 'Удалите связи ролей')
    return res.redirect('/rules/role')
}

exports.GiveRule = async (req, res) =>{
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    await rbac.role.GiveRule(req.body.selectNameId, req.body.selectRuleId)
    return res.redirect('/rules') 
}

exports.DeleteRuleFromUser = async (req, res) =>{
    console.log(123+"fds");
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
        req.flash('error', data.error)
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
    const data = await rbac.permission.DeletePermission(req.params.id)
    if(data !== undefined)
        req.flash('error', 'Удалите связи разрешений')
    return res.redirect(`/rules/permission`)
}