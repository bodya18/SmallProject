const RBAC = require('../service/RBAC_Service')

exports.Sub = async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    await rbac.news.Subscribe(req.body.email)
    return res.redirect(req.get('referer'));
}