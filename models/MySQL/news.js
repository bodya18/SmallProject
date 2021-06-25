const pool = require('../../middleware/pool')
const fs = require('fs')
const config = require('../../middleware/config');

class News{
    
    async edit(post_text, postUrl, categoryId, title, id) {
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
                await pool.query('update news set post_text=?, categoryId=?, title=?, postUrl=? where id=?', [post_text, categoryId, title, postUrl.path, id])
            }
            else{
                await pool.query('update news set post_text=?, categoryId=?, title=? where id=?', [post_text, categoryId, title, id])
            }
            
        }
        catch (e){
            console.log(e)
        }
    }

    async create(post_text, postUrl, categoryId, title) {
        try{
            await pool.query('Insert into news (post_text, postUrl, categoryId, title) values (?, ?, ?, ?)', [post_text, postUrl.path, categoryId, title])
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
}

module.exports = News