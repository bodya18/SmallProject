const config = require('../middleware/config')
const CategoriesModel = require(`../models/${config.database}/categories`)

class Categories{
    constructor(){
        this.category = new CategoriesModel
        this.is = false
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
        
        return await this.category.GetCategories()
    }

    async GetCategories(){
        return await this.category.GetCategories()
    }

    async GetCategoriesById(id){
        return await this.category.GetCategoriesById(id)
    }
}

module.exports = Categories