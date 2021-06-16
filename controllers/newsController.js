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
    const data = [100, 10, 1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,11,1,1,1]
    res.render('./bootstrap-news-template/single-page.hbs', {
        title: news.title,
        news: news,
        dataNews: dataNews,
        categories: categories.id,
        data: data
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