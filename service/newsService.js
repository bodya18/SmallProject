const config = require('../middleware/config')
const NewsModel = require(`../models/${config.database}/news`)
const file = require('../middleware/file')
const CategoriesModel = require(`../models/${config.database}/categories`)
const fs = require('fs');

class News{
    constructor(){
        this.news = new NewsModel
        this.is = false
        this.category = new CategoriesModel
    }

    async Subscribe(email){
        if(email.length < 2)
            return {error: 'Введите настоящий email'}
        const data = await this.news.isSub(email)
        if(data)
            return {error: 'Данный email уже подписан на рассылку'}
        await this.news.Subscribe(email);
    }

    async CreateNews(title, postText, selectCategoryId, filedata) {
        if(title.length < 5)
        return {
            isCreate: false,
            error: 'Название статьи должно быть длиннее 5 символов'
        }
        if(title.length > 100)
            return {
                isCreate: false,
                error: 'Название статьи должно быть не длиннее 100 символов'
            }
        if(postText.length < 100)
            return {
                isCreate: false,
                error: 'Статья должна быть длиннее 100 символов'
            }
        if((!filedata) && (file.inFile === true)){
            file.inFile = false
            return {perm: false, error: 'Аватар пользователя должен быть фотографией'}
        }
        await this.news.create(postText, filedata, selectCategoryId, title)
        return{isCreate:true}
        
    }

    async GetCreate (){
        return await this.category.GetCategories()
    }

    async GetEdit (perm, id){
        for (let i = 0; i < perm.length; i++) {
            if(perm[i] === "GIVE"){
                this.is = true
                break;
            }
        }
        if(!this.is){
            return false
        }
        
        const categories = await this.category.GetCategories()
        const news = await this.news.getById(id)
        return {
            news,
            categories
        }
    }

    async EditNews(title, postText, selectCategoryId, filedata, id){
        if(title.length < 5)
        return {
            isCreate: false,
            error: 'Название статьи должно быть длиннее 5 символов'
        }
        if(title.length > 100)
            return {
                isCreate: false,
                error: 'Название статьи должно быть не длиннее 100 символов'
            }
        if(postText.length < 100)
            return {
                isCreate: false,
                error: 'Статья должна быть длиннее 100 символов'
            }
        if((!filedata) && (file.inFile === true)){
            file.inFile = false
            return {isCreate: false, error: 'Аватар пользователя должен быть фотографией'}
        }
        await this.news.edit(postText, filedata, selectCategoryId, title, id)
        return{isCreate:true}
    }
    
    async GetNewsById(id){
        return await this.news.getById(id)
    }
    async GetNewsByTitle(title){
        return await this.news.getByTitle(title)
    }
    async GetNews(){
        return await this.news.GetNews()
    }
    async GetNewsByCategory(categoryId){
        return await this.news.GetNewsByCategory(categoryId)
    }
    async DeleteNews(id){
        return await this.news.DeleteNews(id)
    }
    
    async newComment(comment, newsId, userId){
        if (comment.length < 1) 
            return {error: 'Длина комментария должна быть длиннее 1 символа'}
        return await this.news.newComment(comment, newsId, userId)
    }

    async editSettings(key, selectCategoryId){
        if(selectCategoryId === undefined)
            return {
                isCreate: false,
                error: 'Выберите категории для показа'
            }
        fs.writeFile(`${config.dirname}/settings/${key}`, JSON.stringify(selectCategoryId), (error) =>{
            if(error) throw error;
        })
    }

    async CreateSettings(key, label, checkNews){
        if (key.length < 5)
            return {
                isCreate: false,
                error: 'Длина ключа должна быть не менее 5 символов'
            }
        if (label.length < 5)
            return {
                isCreate: false,
                error: 'Длина названия должна быть не менее 5 символов'
            }
        if(checkNews === undefined)
            return {
                isCreate: false,
                error: 'Выберите новости для показа'
            }

        let data = JSON.stringify(checkNews)
        fs.writeFile(`${config.dirname}/settings/${key}`, data, (error) =>{
            if(error) throw error;
        })
        await this.news.CreateSettings(key, label, `/settings/${key}`)
    }

    async GetCategoriesInSettings(key){
        return await this.news.GetSettingsByKey(key)
    }

    async GetSettings(){
        return await this.news.GetSettings()
    }

    async GetSettingsByKey(key){
        return await this.news.GetSettingsByKey(key)
    }

    async GetComments(newsId){
        return await this.news.GetComments(newsId)
    }
}

module.exports = News