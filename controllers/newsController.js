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
            var a = left;
            left = parseInt(left);
            var LeftNews = []
            if((typeof a)==('object')){
                for (let i = 0; i < a.length; i++) {
                    LeftNews[i] = await rbac.news.GetNewsById(a[i]) 
                }
            }else{
                LeftNews[0] = await rbac.news.GetNewsById(left) 
            }
            fs.readFile(`${config.dirname}${TopRight.value}`, "utf8", async (error, right) =>{
                if(error) throw error;
                right = JSON.parse(right);
                var a = right;
                right = parseInt(right);
                var RightNews = [];
                if((typeof a)==('object')){
                    for (let i = 0; i < a.length; i++) {
                        RightNews[i] = await rbac.news.GetNewsById(a[i]) 
                    }
                }else{
                    RightNews[0] = await rbac.news.GetNewsById(right) 
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
    if(!news)
        return res.redirect('/news')
    const views = await rbac.news.GetViews(req.params.id)
    var dataNews = await rbac.news.GetNewsByCategoryNoThisPost(news.categoryId, req.params.id)
    const categories = await rbac.category.GetCategoriesById(news.categoryId)

    const comments = await rbac.news.GetComments(req.params.id)
    const users = await rbac.user.GetUsers()

    const isLike = await rbac.news.isLike(req.params.id, req.session.userIden)

    const isSave = await rbac.news.isSave(req.session.userIden, req.params.id)
    if(dataNews.length > 5){
        dataNews = dataNews.slice(0, 5)
    }
    res.render('./bootstrap-news-template/single-page.hbs', {
        title: news.title,
        news: news,
        users,
        views,
        dataNews: dataNews,
        comments,
        categories: categories.id,
        error: req.flash('error'),
        isLike,
        isSave,
        EditComment: req.flash('comment')[0]
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
        const Allnews = await rbac.news.GetNews()
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
                    Allnews,
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
                    Allnews,
                    isAdmin: true,
                    error: req.flash('error')
                })
            }
        }
        else{
            if (category === undefined || category === 'undefined') {
                var SelectTitle = await rbac.news.GetNewsByTitle(title)
                const categories = await rbac.category.GetCategories()
                return res.render('EditSettingsTopNews.hbs', {
                    title: 'Редактирование настройки',
                    settings,
                    categories,
                    isSettings: true,
                    categoriesSelect,
                    Allnews,
                    news: SelectTitle,
                    isAdmin: true,
                    error: req.flash('error')
                })
            }
            else{
                var SelectTitle = await rbac.news.GetNewsByTitle(title)
                return res.render('EditSettingsTopNews.hbs', {
                    title: 'Редактирование настройки',
                    settings,
                    categoriesSelect,
                    categories: categoriesSelect,
                    Allnews,
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
    res.redirect(`/news/GetEditSettings/${req.body.key}?category=${req.body.SelectCategory}&title=${req.body.selectTitleId}`)
}

exports.newComment = async(req, res) =>{
    const rbac = new RBAC
    const data = await rbac.news.newComment(req.body.comment, req.body.newsId, req.body.userId)
    let error
    if (data)
        error = data.error
    else
        error = false
    const comm = await rbac.news.GetCommentByAll(req.body.comment, req.body.newsId, req.body.userId)

    let comment = JSON.stringify({comment: comm, error: error, user: req.session.user});

    comment = JSON.parse(comment)
    res.json(comment)
}

exports.EditThisComment = async(req, res) =>{
    const rbac = new RBAC
    const data = await rbac.news.EditThisComment(req.body.comment, req.params.id)
    let error = false
    if (data)
        error = data.error
    const comm = await rbac.news.GetCommentById(req.params.id)

    let comment = JSON.stringify({comment: comm, error: error, user: req.session.user});

    comment = JSON.parse(comment)
    res.json(comment)
}

exports.DeleteComment = async(req, res) =>{
    const rbac = new RBAC
    await rbac.news.DeleteComment(req.body.commentId)
    res.json(true)
}

exports.like = async(req, res) =>{
    const rbac = new RBAC
    await rbac.news.like(req.body.userId, req.body.newsId)
    const news = await rbac.news.GetNewsById(req.body.newsId)

    const isLike = await rbac.news.isLike(req.body.newsId, req.session.userIden)

    let like = JSON.stringify({likes: news.likes, isLike: isLike});
    like = JSON.parse(like)
    res.json(like)
}

exports.watchLater = async(req, res) =>{
    const rbac = new RBAC
    let isSave = await rbac.news.isSave(req.session.userIden, req.body.newsId)

    await rbac.news.watchLater(req.body.userId, req.body.newsId)
    if (isSave) 
        isSave = true
    else
        isSave = false
    let save = JSON.stringify({isSave: isSave});
    save = JSON.parse(save)
    res.json(save)    
}

exports.GetWatchLater = async(req, res) =>{
    const rbac = new RBAC
    const newsId = await rbac.news.GetWatchLater(req.session.userIden)
    var news = []
    for (let i = 0; i < newsId.length; i++) {
        news[i] = await rbac.news.GetNewsById(newsId[i].newsId)  
    }
    res.render('WatchLater.hbs', {
        title: 'Избранное',
        isWatchLater: true,
        news
    })
}

exports.SetViews = async(req, res) =>{
    const rbac = new RBAC
    let count = await rbac.news.GetViews(req.body.newsId)
    await rbac.news.SetViews(req.body.newsId, ++count)
    res.json(count)
}