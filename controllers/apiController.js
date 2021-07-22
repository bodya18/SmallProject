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

exports.newsCategory = async (req,res) =>{
    const rbac = new RBAC
    const TopNews = await rbac.news.GetNewsByCategory(req.body.categoryId)
    return res.json(TopNews)
}
exports.search = async (req,res) =>{
    const rbac = new RBAC
    let news = await rbac.news.search(req.body.search)
    let data = new Date()
    const nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
    data = {nowDate, news}
    res.json(data)
}

exports.news = async (req,res) =>{
    const rbac = new RBAC
    let news = await rbac.news.GetNewsByCategoryNoThisPost(req.body.categoryId, req.body.newsId)
    if(news.length>5 && (typeof news)=='object'){
        const shuffled = news.sort(() => 0.5 - Math.random());
        news = shuffled.slice(0, 5);
    }
    const users = await rbac.user.GetUsers()
    const TopNews = await rbac.news.GetNewsById(req.body.newsId)
    const isLike = await rbac.news.isLike(req.body.newsId, req.session.userIden)
    const isSave = await rbac.news.isSave(req.session.userIden, req.body.newsId)
    const views = await rbac.news.GetViews(req.body.newsId)
    TopNews.isLike = isLike
    TopNews.isSave = isSave
    TopNews.views = views
    const data = {news: news, permissionsList: req.session.Perm, user: req.session.user, users: users, isAuth: req.session.isAuthenticated, TopNews}
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

exports.GetNewsById = async (req, res) =>{
    const rbac = new RBAC
    const data = await rbac.news.GetNewsById(req.body.newsId)
    return res.json(data)
}