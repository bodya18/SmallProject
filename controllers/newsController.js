const RBAC = require('../service/RBAC_Service');

exports.GetNews = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetNews()
    const categories = await rbac.category.GetCategories()
    res.render('./bootstrap-news-template/index.hbs', {
        title: 'Список пользователей',
        isNews: true,
        news: news,
        categories: categories
    })
}

exports.GetThisPost = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetNewsById(req.params.id)
    const dataNews = await rbac.news.GetNews()
    const categories = await rbac.category.GetCategoriesById(news.categoryId)
    res.render('./bootstrap-news-template/single-page.hbs', {
        title: news.title,
        news: news,
        dataNews: dataNews,
        categories: categories.id
    })
}

exports.GetCreate = async (req,res) => {
    const rbac = new RBAC
    const data = await rbac.news.GetCreate(req.session.Perm)
    if(data === false)
        return res.redirect('/news')
    res.render('createNews.hbs', {
        categories: data,
        title: 'Создание статьи',
        isCreate: true,
        error: req.flash('error')
    })
}

exports.CreateNews = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.CreateNews(req.body.title, req.body.postText, req.body.selectCategoryId, req.file)
    if(data.isCreate===false){
        req.flash('error', data.error)
        return res.redirect(`/news/create`)
    }
    
    return res.redirect('/news')
}