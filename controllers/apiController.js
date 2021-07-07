const RBAC = require('../service/RBAC_Service')

exports.comment = async (req,res) =>{
    const rbac = new RBAC
    const comments = await rbac.news.GetComments(req.body.id)
    const users = await rbac.user.GetUsers()
    const data = {permissionsList: req.session.Perm, user: req.session.user, comments: comments, users: users}
    return res.json(data)
}

exports.UserSession = async (req,res) =>{
    const data = {user: req.session.user}
    return res.json(data)
}

exports.news = async (req,res) =>{
    const rbac = new RBAC

    const news = await rbac.news.GetNewsByCategoryNoThisPost(req.body.categoryId, req.body.newsId)
    const comments = await rbac.news.GetComments(req.body.newsId)
    const users = await rbac.user.GetUsers()

    const isLike = await rbac.news.isLike(req.body.newsId, req.session.userIden)
    const isSave = await rbac.news.isSave(req.session.userIden, req.body.newsId)
    
    const data = {news: news, permissionsList: req.session.Perm, user: req.session.user, users: users, isAuth: req.session.isAuthenticated}
    return res.json(data)
}

exports.ThisNews = async (req,res) =>{
    const rbac = new RBAC

    const comments = await rbac.news.GetComments(req.body.newsId)
    const views = await rbac.news.GetViews(req.body.newsId)
    const isLike = await rbac.news.isLike(req.body.newsId, req.session.userIden)
    const isSave = await rbac.news.isSave(req.session.userIden, req.body.newsId)
    const data = {comments: comments, isLike: isLike, isSave: isSave, views: views}
    return res.json(data)
}