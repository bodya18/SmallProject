const RBAC = require('../service/RBAC_Service')

exports.GetUsers = async (req,res) =>{
    const rbac = new RBAC
    const data = await rbac.user.GetUsers()
    return res.json(data)
}