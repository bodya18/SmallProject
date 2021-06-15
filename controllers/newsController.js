// const RBAC = require('../service/RBAC_Service')
const config = require('../middleware/config')
const NewsModel = require(`../models/${config.database}/news`)
const RBAC = require('../service/RBAC_Service');

exports.GetNews = async (req,res) => {
    res.render('./bootstrap-news-template/index.hbs', {
        title: 'Список пользователей',
        isNews: true
    })
}

exports.GetPost = async (req,res) => {
    res.render('./bootstrap-news-template/single-page.hbs', {
        title: ''
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