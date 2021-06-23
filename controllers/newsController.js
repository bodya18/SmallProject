const RBAC = require('../service/RBAC_Service');
const fs = require('fs');
const config = require('../middleware/config');

exports.GetNews = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetNews()
    const categoriesId = await rbac.news.GetCategoriesInSettings('SelectedCategories')
    const TopLeft = await rbac.news.GetCategoriesInSettings('TopLeftNewsSlider')
    const TopRight = await rbac.news.GetCategoriesInSettings('TopRightNewsSlider')
    fs.readFile(`${config.dirname}${categoriesId.value}`, "utf8", async (error, data) =>{
        if(error) throw error;
        data = JSON.parse(data);
        var categories = [];
        for (let i = 0; i < data.length; i++) {
            categories[i] = await rbac.category.GetCategoriesById(data[i]) 
        }
        fs.readFile(`${config.dirname}${TopLeft.value}`, "utf8", async (error, left) =>{
            if(error) throw error;
            left = JSON.parse(left);
            var LeftNews = [];
            for (let i = 0; i < left.length; i++) {
                LeftNews[i] = await rbac.news.GetNewsById(left[i]) 
            }
            fs.readFile(`${config.dirname}${TopRight.value}`, "utf8", async (error, right) =>{
                if(error) throw error;
                right = JSON.parse(right);
                var RightNews = [];
                for (let i = 0; i < right.length; i++) {
                    RightNews[i] = await rbac.news.GetNewsById(right[i]) 
                }
                
                res.render('./bootstrap-news-template/index.hbs', {
                    title: 'Новости',
                    isNews: true,
                    RightNews,
                    LeftNews,
                    news,
                    categories
                })
            })
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
    const data = await rbac.news.CreateSettings(req.body._key, req.body.label, req.body.checkNews)
    if(data){
        req.flash('error', data.error)
        return res.redirect(`/news/settings/create`)
    }

    return res.redirect(`/news/settings`)
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
    const data = await rbac.news.GetCreate()
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
    var data
    if(req.body.key === 'SelectedCategories'){
        data = await rbac.news.editSettings(req.body.key, req.body.selectCategoryId)
    }
    else{
        data = await rbac.news.editSettings(req.body.key, req.body.checkNews)
    }
    
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
    
    if(req.params.key === 'SelectedCategories'){    
        const categories = await rbac.category.GetCategories()
        return res.render('EditSettingsCategories.hbs', {
            title: 'Редактирование настройки',
            settings,
            categories,
            isAdmin: true,
            isSettings: true,
            error: req.flash('error')
        })
    }
    else{
        var category = req.query.category
        const title = req.query.title
        const categoriesSelect = await rbac.category.GetCategories()
        if(title === undefined || title === ''){
            if (category === undefined || category === 'undefined') {
                const news = await rbac.news.GetNews()
                const categories = await rbac.category.GetCategories()
                return res.render('EditSettingsTopNews.hbs', {
                    title: 'Редактирование настройки',
                    settings,
                    categories,
                    categoriesSelect,
                    news,
                    isSettings: true,
                    isAdmin: true,
                    error: req.flash('error')
                })
            }
            else{
                
                category = category.split(',')
                var SelectCategories = []
                for (let i = 0; i < category.length; i++) {
                    SelectCategories.push((await rbac.news.GetNewsByCategory(category[i])))
                }
                var newNews = [].concat(...SelectCategories);
                var categories = [];
                for (let i = 0; i < category.length; i++) {
                    categories.push(await rbac.category.GetCategoriesById(category[i]))
                }
                
                return res.render('EditSettingsTopNews.hbs', {
                    title: 'Редактирование настройки',
                    settings,
                    categories,
                    isSettings: true,
                    categoriesSelect,
                    news: newNews,
                    isAdmin: true,
                    error: req.flash('error')
                })
            }
        }
        else{
            if (category === undefined || category === 'undefined') {
                const SelectTitle = await rbac.news.GetNewsByTitle(title)
                const categories = await rbac.category.GetCategories()
                return res.render('EditSettingsTopNews.hbs', {
                    title: 'Редактирование настройки',
                    settings,
                    categories,
                    isSettings: true,
                    categoriesSelect,
                    news: SelectTitle,
                    isAdmin: true,
                    error: req.flash('error')
                })
            }
            else{
                const SelectTitle = await rbac.news.GetNewsByTitle(title)
                return res.render('EditSettingsTopNews.hbs', {
                    title: 'Редактирование настройки',
                    settings,
                    categoriesSelect,
                    categories: categoriesSelect,
                    news: SelectTitle,
                    isSettings: true,
                    isAdmin: true,
                    error: req.flash('error')
                })
            }
        }
    }
}

exports.GetCreateSettings = async (req, res) =>{
    const rbac = new RBAC
    const settings = await rbac.news.GetSettingsByKey(req.params.key)
    const categories = await rbac.category.GetCategories()
    const news = await rbac.news.GetNews()
    res.render('CreateSettings.hbs', {
        title: 'Создание настройки',
        isCreateSettings: true,
        categories,
        settings,
        news,
        isAdmin: true,
        error: req.flash('error')
    })
}

exports.GetSearchNews = async(req, res) =>{
    res.redirect(`/news/GetEditSettings/${req.body.key}?category=${req.body.SelectCategory}&title=${req.body.title}`)
}