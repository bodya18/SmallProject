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
    var dataNews = await rbac.news.GetNewsByCategory(news.categoryId)
    const categories = await rbac.category.GetCategoriesById(news.categoryId)

    if(dataNews.length > 5){
        dataNews = dataNews.slice(0, 5)
    }
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

exports.GetEdit = async (req,res) => {
    const rbac = new RBAC
    const data = await rbac.news.GetEdit(req.session.Perm, req.params.id)
    if(data === false)
        return res.redirect('/news')
    res.render('editNews.hbs', {
        categories: data.categories,
        news: data.news,
        title: 'Редактирование статьи',
        isCreate: true,
        error: req.flash('error')
    })
}

exports.EditNews = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.EditNews(req.body.title, req.body.postText, req.body.selectCategoryId, req.file, req.body.id)
    if(data.isCreate === false){
        req.flash('error', data.error)
        return res.redirect(`/news/edit/${req.body.id}`)
    }
    return res.redirect('/news')
}

exports.CreateNews = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.CreateNews(req.body.title, req.body.postText, req.body.selectCategoryId, req.file)
    if(data.isCreate === false){
        req.flash('error', data.error)
        return res.redirect(`/news/create`)
    }
    
    return res.redirect('/news')
}

exports.DeleteNews = async (req, res) => {
    const rbac = new RBAC
    await rbac.news.DeleteNews(req.params.id)
    return res.redirect('/news')
}