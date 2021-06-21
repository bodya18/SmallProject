const RBAC = require('../service/RBAC_Service');
const fs = require('fs');

exports.GetNews = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetNews()
    const categoriesId = await rbac.news.GetCategoriesInSettings('SelectedCategories')
    fs.readFile(`/home/bogdan/NodeJsProjects/SmallProject${categoriesId.value}`, "utf8", async (error, data) =>{
        if(error) throw error;
        data = JSON.parse(data);
        var categories = [];
        for (let i = 0; i < data.length; i++) {
            categories[i] = await rbac.category.GetCategoriesById(data[i]) 
        }
        
        res.render('./bootstrap-news-template/index.hbs', {
            title: 'Новости',
            isNews: true,
            news: news,
            categories: categories
        })
    })
}

exports.GetSettings = async (req,res) => {
    const rbac = new RBAC
    const settings = await rbac.news.GetSettings()
    res.render('settings.hbs', {
        title: 'Настройки',
        isSettings: true,
        isAdmin: true,
        settings
    })
}

exports.CreateSettings = async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const rbac = new RBAC
    const data = await rbac.news.CreateSettings(req.body._key, req.body.label, req.body.selectCategoryId)
    if(data){
        req.flash('error', data.error)
        return res.redirect(`/news/settings`)
    }

    return res.redirect(`/admin`)
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
    res.render('createNews.hbs', {
        categories: data,
        title: 'Создание статьи',
        isAdmin: true,
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
        error: req.flash('error'),
        isAdmin: true
    })
}

exports.EditNews = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.EditNews(req.body.title, req.body.postText, req.body.selectCategoryId, req.file, req.body.id)
    if(data.isCreate === false){
        req.flash('error', data.error)
        return res.redirect(`/news/edit/${req.body.id}`)
    }
    return res.redirect('/news/get/'+req.body.id)
}

exports.editSettings = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.editSettings(req.body.key, req.body.selectCategoryId)
    if(data){
        req.flash('error', data.error)
        return res.redirect(`/news/GetEditSettings/`+req.body.key)
    }
    return res.redirect('/news')
}

exports.CreateNews = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.CreateNews(req.body.title, req.body.postText, req.body.selectCategoryId, req.file)
    if(data.isCreate === false){
        req.flash('error', data.error)
        return res.redirect(`/news/create/post`)
    }
    
    return res.redirect('/news')
}

exports.DeleteNews = async (req, res) => {
    const rbac = new RBAC
    await rbac.news.DeleteNews(req.params.id)
    return res.redirect('/news')
}

exports.DeleteCategory = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.category.DeleteCategory(req.params.id)
    if(data === false)
        req.flash('error', 'Чтобы удалить категорию требуется удалить ВСЕ новости в данной категории!')
    return res.redirect('/news/categories')
}

exports.GetCreateCategory = async (req,res) => {
    res.render('createCategory.hbs', {
        title: 'Создание категории',
        isAdmin: true,
        isCreateCategory: true,
        error: req.flash('error')
    })
}

exports.CreateCategory = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.category.CreateCategory(req.body.title)
    if(data === true){
        return res.redirect('/news/categories')
    }
    req.flash('error', data.error)
    return res.redirect(`/news/create/category`)
}

exports.GetCategories = async (req,res) => {
    const rbac = new RBAC
    const categories = await rbac.category.GetCategories()
    res.render('categories.hbs', {
        title: 'Список категорий',
        isCategories: true,
        categories: categories,
        isAdmin: true,
        error: req.flash('error')
    })
}

exports.GetEditSettings = async (req,res) => {
    const rbac = new RBAC
    const settings = await rbac.news.GetSettingsByKey(req.params.key)
    const categories = await rbac.category.GetCategories()
    res.render('EditSettings.hbs', {
        title: 'Редактирование настройки',
        settings,
        categories: categories,
        isAdmin: true,
        error: req.flash('error')
    })
}

exports.GetCreateSettings = async (req, res) =>{
    const rbac = new RBAC
    const categories = await rbac.category.GetCategories()
    res.render('CreateSettings.hbs', {
        title: 'Создание настройки',
        isCreateSettings: true,
        categories,
        isAdmin: true,
        error: req.flash('error')
    })
}