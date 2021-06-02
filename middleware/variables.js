module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    res.locals.userId = req.session.userIden
    res.locals.userRole = req.session.Role
    next()
}