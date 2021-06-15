const News = require('./newsService');
const Permission = require('./permissionService')
const Role = require('./roleService')
const User = require('./userService');

class RBAC{
    constructor(){
        this.news = new News;
        this.user = new User;
        this.role = new Role;
        this.permission = new Permission;
    }
}

module.exports = RBAC