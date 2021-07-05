const RBAC = require('../service/RBAC_Service')

exports.GetComm = async (req,res) =>{
    const rbac = new RBAC
    const data = await rbac.news.GetComments(req.params.id)
    return res.json(data)
}

exports.GetUsers = async (req,res) =>{
    const rbac = new RBAC
    const data = await rbac.user.GetUsers()
    return res.json(data)
}

exports.session = async (req,res) =>{
    const rbac = new RBAC
    console.log(req.body);
    const comments = await rbac.news.GetComments(req.body.id)
    const users = await rbac.user.GetUsers()
    const data = {permissionsList: req.session.Perm, user: req.session.user, comments: comments, users: users}
    console.log(data);
    return res.json(data)
}