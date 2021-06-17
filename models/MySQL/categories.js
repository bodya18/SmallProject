const pool = require('../../middleware/pool')
const fs = require('fs')

class Categories{

    async createCategory(title) {
        try{
            await pool.query('Insert into Categories (category) values (?)', [title])
        }
        catch (e){
            console.log(e) 
        }
    }
    
    async GetCategories(){
        var temp
        await pool.query('Select * from Categories')
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    async GetCategoriesById(id){
        var temp
        await pool.query('Select * from Categories where id = ?', [id])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async GetByName(title){
        var temp
        await pool.query('Select * from Categories where category = ?', [title])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
}

module.exports = Categories