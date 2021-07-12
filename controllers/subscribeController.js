const RBAC = require('../service/RBAC_Service')

exports.Sub = async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    let error = await rbac.news.Subscribe(req.body.email)
    if(!error)
        error = false
    res.json(error)
}