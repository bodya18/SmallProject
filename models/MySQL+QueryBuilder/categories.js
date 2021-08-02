const pool = require('../../middleware/pool')


class Categories{

    async createCategory(title) {
        const qb = await pool.get_connection();
        await qb.insert('Categories', {category: title})
        qb.release();
    }
    
    async GetCategories(){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .get('Categories');
        qb.release()
        return response
    }
    async GetCategoriesById(id){
        const qb = await pool.get_connection();
        const response = await qb.select('*')
            .where({id})
            .get('Categories')
        qb.release();
        return response[0]
    }

    async GetByName(title){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .where({category: title})
            .get('Categories');
        qb.release()
        return response[0]
    }

    async DeleteCategory(id){
        const qb = await pool.get_connection()        
        let response = await qb
            .select('*')
            .where({categoryId: id})
            .get('news');
        if(!response[0]){
            await qb.delete('Categories', {id})
            response = true
        }
        else 
            response = false
        qb.release()
        return response
    }
}

module.exports = Categories