const RBAC = require('../service/RBAC_Service');
const fs = require('fs');
const config = require('../middleware/config');
var xml2js = require('xml2js');

exports.GetNews = async (req,res) => {
    

    const rbac = new RBAC
    const news = await rbac.news.GetNews()
    const data = new Date()
    const nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
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
                    nowDate,
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
    const data = new Date()
    const nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
    if(!news || nowDate < news.time)
        return res.redirect('/news')
    const views = await rbac.news.GetViews(req.params.id)
    const categories = await rbac.category.GetCategoriesById(news.categoryId)
    const isLike = await rbac.news.isLike(req.params.id, req.session.userIden)
    const isSave = await rbac.news.isSave(req.session.userIden, req.params.id)
    res.render('./bootstrap-news-template/single-page.hbs', {
        title: news.title,
        description: news.meta_description,
        h1: news.h1,
        news: news,
        views,
        categories: categories.id,
        isLike,
        isSave,
    })
}

exports.getInCategory = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetOneNewsByCategory(req.params.id)
    console.log(news);
    const data = new Date()
    const nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
    if(!news || nowDate < news.time)
        return res.redirect('/news')
    const views = await rbac.news.GetViews(news.id)
    const categories = await rbac.category.GetCategoriesById(news.categoryId)
    const isLike = await rbac.news.isLike(news.id, req.session.userIden)
    const isSave = await rbac.news.isSave(req.session.userIden, news.id)
    res.render('./bootstrap-news-template/single-page.hbs', {
        title: news.title,
        description: news.meta_description,
        h1: news.h1,
        news: news,
        views,
        categories: categories.id,
        isLike,
        isSave,
    })
}

exports.GetCreate = async (req,res) => {
    const rbac = new RBAC
    const data = await rbac.news.GetCreate()
    const tags = await rbac.news.getTags()
    res.render('createNews.hbs', {
        categories: data,
        tags: tags,
        title: 'Создание статьи',
        isAdmin: true,
        isCreate: true,
        error: req.flash('error')
    })
}

exports.GetEdit = async (req,res) => {
    const rbac = new RBAC
    const data = await rbac.news.GetEdit(req.params.id)
    const tags = await rbac.news.getTags()
    const selectTags = await rbac.news.getSelectTags(req.params.id)
    for (let i = 0; i < tags.length; i++)
        for (let j = 0; j < selectTags.length; j++){
            if (selectTags[j].tag === tags[i].tag)
                tags.splice(i, 1)
        }
    res.render('editNews.hbs', {
        categories: data.categories,
        selectTags,
        news: data.news,
        tags,
        title: 'Редактирование статьи',
        error: req.flash('error'),
        isAdmin: true
    })
}

exports.EditNews = async (req, res) => {
    const rbac = new RBAC
    const data = await rbac.news.EditNews(req.body.h1, req.body.meta_description, req.body.selectTagId, req.body.title, req.body.tbxQuestion, req.body.selectCategoryId, req.file, req.body.id)
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
    const data = await rbac.news.CreateNews(req.body.h1, req.body.meta_description, req.body.selectTagId, req.body.timeout, req.body.title, req.body.tbxQuestion, req.body.selectCategoryId, req.file)
    if(data.isCreate === false){
        req.flash('error', data.error)
        return res.redirect(`/news/create/post`)
    }else{
        res.redirect('/news')
        let parser = new xml2js.Parser()
        let xmlBuilder = new xml2js.Builder();
        let dir = config.dirname+'/xml/all.xml'
        let description = req.body.tbxQuestion.replace(/<.*?>/g, "").replace(/&.*?;/g, "").slice(0, 200)
        if(req.body.meta_description)
            description = req.body.meta_description
        const id = await rbac.news.LAST_INSERT_ID()
        let obj = {title: [req.body.title], description: [description], link: [`http://localhost:3000/news/get/${id}`], guid: [`http://localhost:3000/news/get/${id}`]}
        
        fs.readFile(dir, function(err, data) {
            parser.parseString(data, function (err, result) {
                result.rss.channel[0].item.unshift(obj);
                var xml = xmlBuilder.buildObject(result);
                fs.writeFile(dir, xml, (e)=>{
                    if(e) console.error(e);
                });
            });
        });
        setTimeout(async() => {
            const category = await rbac.category.GetCategoriesById(req.body.selectCategoryId)
            dir = config.dirname+`/xml/${category.category}.xml`
            fs.readFile(dir, function(err, data) {
                parser.parseString(data, function (err, result) {
                    result.rss.channel[0].item.unshift(obj);
                    var xml = xmlBuilder.buildObject(result);
                    fs.writeFile(dir, xml, (e)=>{
                        if(e) console.error(e);
                    });
                });
            });
        }, 1000);
    }
}

exports.DeleteNews = async (req, res) => {
    const rbac = new RBAC
    await rbac.news.DeleteNews(req.params.id)
    return res.redirect('/news')
}

exports.DeleteCategory = async (req, res) => {
    const rbac = new RBAC
    const category = await rbac.category.GetCategoriesById(req.params.id)
    const data = await rbac.category.DeleteCategory(req.params.id)
    if(data === false)
        req.flash('error', 'Чтобы удалить категорию требуется удалить ВСЕ новости в данной категории!')
    else{
        let dir = config.dirname+`/xml/${category.category}.xml`
        fs.unlink(dir, (err) => {
              if (err) console.log(err);
        });
    }
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
        let dir = config.dirname+`/xml/${req.body.title}.xml`
        const xml = 
`<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
    <channel>
        <title>Новостная лента по категории ${req.body.title}</title>
        <link>${config.site}</link>
        <description>Самые последние и горячие новости</description>
        <language>ru</language>
        <item>
            <title></title>
            <description></description>
            <link></link>
            <guid></guid>
        </item>
    </channel>
</rss>`
        fs.writeFile(dir, xml, (e)=>{
            if(e) console.error(e);
        });

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
        const data = new Date()
        const nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
        var category = req.query.category
        const title = req.query.title
        const categoriesSelect = await rbac.category.GetCategories()
        const Allnews = await rbac.news.GetNews()
        if(title === undefined || title === ''){
            if (category === undefined || category === 'undefined') {
                const news = await rbac.news.GetNews()
                const categories = await rbac.category.GetCategories()
                return res.render('EditSettingsTopNews.hbs', {
                    nowDate,
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
                    nowDate,
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
                    nowDate,
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
                    nowDate,
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

exports.search = async(req, res) =>{
    if (req.body.search === '') {
        return res.redirect(req.header(`Referer`))
    }
    res.redirect(`/news/getSearch/${req.body.search}`)
}

exports.GetSearch = async(req, res) =>{
    const rbac = new RBAC
    let news = await rbac.news.search(req.params.search)
    news = news.slice(0,10)
    for (let i = 0; i < news.length; i++) {
        news[i].post_text = news[i].post_text.replace(/<.*?>/g, "").replace(/&.*?;/g, "")
    }
    let isMore = false
    if(news.length === 10)
        isMore = true
    const data = new Date()
    const nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
    res.render('search.hbs',{
        title: req.params.search,
        news,
        nowDate,
        isMore
    })
}

exports.GetNewTag = async(req, res) =>{
    res.render('createTags.hbs',{
        title: 'Создание тэга',
        isAdmin: true,
        isCreateTag: true,
        error: req.flash('error')
    })
}

exports.CreateTag = async(req, res) =>{
    const rbac = new RBAC
    const error = await rbac.news.newTag(req.body.tag)
    if(error){
        req.flash('error', error)
    }
    return res.redirect(`/news/newTag`)
}

exports.AllRss = async(req, res)=>{
    res.sendFile(config.dirname + "/xml/all.xml");
}

exports.RssInCategory = async(req, res)=>{
    const rbac = new RBAC
    const categories = await rbac.category.GetCategoriesById(req.params.id)
    res.sendFile(config.dirname + `/xml/${categories.category}.xml`);
}

exports.listCategories = async(req, res)=>{
    const rbac = new RBAC
    const categories = await rbac.category.GetCategories()
    res.render('listCategories.hbs', {
        categories,
        title: 'Список категорий',
        isListCategories: true
    })    
}