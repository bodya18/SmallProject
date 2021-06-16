const News = require('./newsService');
const Permission = require('./permissionService')
const Role = require('./roleService')
const User = require('./userService');
const Category = require('./categoriesService');

class RBAC{
    constructor(){
        this.news = new News;
        this.user = new User;
        this.role = new Role;
        this.permission = new Permission;
        this.category = new Category;
    }
}

module.exports = RBAC