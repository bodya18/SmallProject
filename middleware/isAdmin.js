module.exports = (req, res, next) => { 
    for (let i = 0; i < req.session.Perm.length; i++) {
        if(req.session.Perm[i] === "GIVE"){
            return next()
        }
    }
    return res.redirect('/news')
}