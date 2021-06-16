const pool = require('../../middleware/pool')
const fs = require('fs')

class News{
    
    async edit(post_text, postUrl, categoryId, title, id) {
        try{
            if(postUrl){
                await pool.query('Select postUrl from news where id=?', [id]) 
                    .then(data =>{ 
                        if(data[0][0].postUrl !== null)
                            fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].postUrl)
                    }) 
                    .catch(e => {
                        return console.log(e)
                    })
                await pool.query('update news set post_text=?, categoryId=?, title=?, postUrl=? where id=?', [post_text, categoryId, title, postUrl, id])
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
    async delete(id){
        await pool.query('Select postUrl from news where id=?', [id])
            .then(data => {
                if(data[0][0].postUrl !== null)
                    fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].postUrl)
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

}

module.exports = News