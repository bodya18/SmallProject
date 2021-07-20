const pool = require('../../middleware/pool')
const fs = require('fs')
const config = require('../../middleware/config');

class News{
    
    async isSave(userId, newsId){
        var temp;
        await pool.query('Select * from WatchLater where userId=? and newsId=?', [userId, newsId])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async DelWatchLater(id){
        await pool.query('delete from WatchLater where id=?', [id])
    }

    async SaveWatchLater(userId, newsId){
        await pool.query('insert into WatchLater (newsId, userId) values (?, ?)', [newsId, userId])
    }

    async GetWatchLater(userId){
        var temp;
        await pool.query('Select * from WatchLater where userId=?', [userId])
            .then(data => {
                temp = data[0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    async edit(h1, meta_description, post_text, postUrl, categoryId, title, id) {
        try{
            if(postUrl){
                await pool.query('Select postUrl from news where id=?', [id]) 
                    .then(data =>{ 
                        if(data[0][0].postUrl !== null)
                            fs.unlinkSync(`${config.dirname}/`+data[0][0].postUrl)
                    }) 
                    .catch(e => {
                        return console.log(e)
                    })
                await pool.query('update news set h1=?, meta_description=?, post_text=?, categoryId=?, title=?, postUrl=? where id=?', [h1, meta_description, post_text, categoryId, title, postUrl.path, id])
            }
            else{
                await pool.query('update news set h1=?, meta_description=?, post_text=?, categoryId=?, title=? where id=?', [h1, meta_description, post_text, categoryId, title, id])
            }
            
        }
        catch (e){
            console.log(e)
        }
    }

    async create(h1, meta_description, timepost, post_text, postUrl, categoryId, title) {
        try{
            await pool.query('Insert into news (h1, meta_description, time, post_text, postUrl, categoryId, title) values (?, ?, ?, ?, ?, ?, ?)', [h1, meta_description, timepost, post_text, postUrl.path, categoryId, title])
        }
        catch (e){
            console.log(e) 
        }
    }
    async DeleteNews(id){
        await pool.query('Select postUrl from news where id=?', [id])
            .then(data => {
                if(data[0][0].postUrl !== null)
                    fs.unlinkSync(`${config.dirname}/`+data[0][0].postUrl)
            })
            .catch(e => {
                return console.log(e)
            })

        await pool.query('delete from news where id=?', [id])
    }

    async getById(id){
        var temp;
        await pool.query('Select * from news where id=?', [id])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async Subscribe(email){
        const data = new Date
        await pool.query('Insert into Subscribers (_data, email) values (?, ?)', [data, email])
    }

    async getSubscribers(){
        var temp;
        await pool.query('Select email from Subscribers')
            .then(data => {
                temp = data[0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    async isSub(email){
        var temp;
        await pool.query('Select * from Subscribers where email=?', [email])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async getByTitle(title){
        var temp;
        await pool.query('Select * from news where title=?', [title])
            .then(data => {
                if (data[0].length > 1) {
                    temp = data[0];
                }
                else{
                    temp = data[0][0];
                }
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    async SelectOrderBy(what, desc = ''){
        var temp
        await pool.query(`SELECT * FROM news ORDER BY ${what} ${desc}`)
            .then(data =>{
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e)
            })
        return temp;
    }
    
    async SelectWhere(what, how){
        var temp
        await pool.query(`SELECT * FROM news where ${what} = ?`, [how])
            .then(data =>{
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e)
            })
        return temp;
    }

    async GetNews(){
        var temp
        await pool.query('Select * from news')
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetNewsByCategory(categoryId){
        var temp
        await pool.query('Select * from news where categoryId = ?', [categoryId])
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetNewsByCategoryNoThisPost(categoryId, newsId){
        var temp
        await pool.query('Select * from news where categoryId = ? and id != ?', [categoryId, newsId])
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }
    
    async CreateSettings(key, label, value){
        try{
            await pool.query('Insert into settings (_key, label, value) values (?, ?, ?)', [key, label, value])
        }
        catch (e){
            console.log(e) 
        }
    }

    async GetSettingsByKey(key){
        var temp
        await pool.query('Select * from settings where _key = ?', [key])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetSettings(){
        var temp
        await pool.query('Select * from settings')
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async newComment(comment, newsId, userId){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '.' + dd + '.' + yyyy;
        await pool.query('Insert into Comments (comment, newsId, userId, date) values (?, ?, ?, ?)', [comment, newsId, userId, today])
    }

    async SetViews(newsId, count){
        await pool.query('update All_Views set count=? where newsId=?', [count, newsId])
    }

    async GetViews(id){
        var temp
        await pool.query('Select count from All_Views where newsId = ?', [id])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async CreateViews(id){
        await pool.query('Insert into All_Views (newsId) values (?)', [id])
    }

    async GetComments(newsId){
        var temp
        await pool.query('Select * from Comments where newsId = ? ORDER BY date DESC', [newsId])
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetCommentByAll(comment, newsId, userId){
        var temp
        await pool.query('Select * from Comments where comment = ? AND newsId = ? AND userId=?', [comment, newsId, userId])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }
    async GetCommentById(id){
        var temp
        await pool.query('Select * from Comments where id=?', [id])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async EditThisComment(comment, id) {
        await pool.query('update Comments set comment=? where id=?', [comment, id])
    }

    async DeleteComment (id) {
        await pool.query('delete from Comments where id=?', [id])
    }

    async isLike(userId, newsId){
        var temp
        await pool.query('Select * from LikeNews where newsId = ? AND userId = ?', [newsId, userId])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetLikes(newsId){
        var temp
        await pool.query('Select likes from news where id = ?', [newsId])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp.likes)
    }

    async DeleteLike(newsId, userId){
        await pool.query('delete from LikeNews where newsId = ? AND userId = ?', [newsId, userId])
    }

    async GiveLike(newsId, userId){
        await pool.query('insert into LikeNews (newsId, userId) values (?, ?)', [newsId, userId])
    }

    async updateLike(newsId, likes){
        await pool.query('update news set likes=? where id=?', [likes, newsId])
    }

    async search(search){
        var temp
        await pool.query(`select * from news where title like '%${search}%' or post_text like '%${search}%' or h1 like '%${search}%' or meta_description like '%${search}%'`)
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async SearchTag(search){
        var temp
        await pool.query(`select * from tag_news where tag like '%${search}%'`)
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async isTag(tag){
        var temp
        await pool.query(`select * from tags where tag = ?`, [tag])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async createTag(tag){
        await pool.query('insert into tags (tag) values (?)', [tag])
    }

    async getTags(){
        var temp
        await pool.query(`select * from tags`)
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    async getSelectTags(id){
        var temp
        await pool.query(`select * from tag_news where newsId=?`,[id])
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async LAST_INSERT_ID(){
        var temp
        await pool.query(`SELECT  LAST_INSERT_ID();`)
            .then(data => {
                temp = data[0][0]['LAST_INSERT_ID()']
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async addTag(tag, newsId){
        await pool.query('insert into tag_news (tag, newsId) values (?, ?)', [tag, newsId])
    }
    async deleteTagsByNewsId(newsId){
        await pool.query('delete from tag_news where newsId = ?', [newsId])
    }
}

module.exports = News