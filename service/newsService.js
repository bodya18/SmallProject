const config = require('../middleware/config')
const NewsModel = require(`../models/${config.database}/news`)
const file = require('../middleware/file')


class News{
    constructor(){
        this.news = new NewsModel
        this.is = false
    }

    async CreateNews(title, postText, selectCategoryId, filedata, perm) {
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

    async GetCreate (perm){
        for (let i = 0; i < perm.length; i++) {
            if(perm[i] === "GIVE"){
                this.is = true
                break;
            }
        }
        if(!this.is){
            return false
        }
        
        return await this.news.GetCategories()
    }

}

module.exports = News