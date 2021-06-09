const Permission = require('./permissionService')
const Role = require('./roleService')
const pool = require('../middleware/pool');
const User = require('./userService');

class RBAC{
    constructor(){
        this.user = new User;
        
        // this.role = new Role;
        // this.permission = new Permission;
    }
}

module.exports = RBAC