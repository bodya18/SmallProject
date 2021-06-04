const pool = require('../middleware/pool')

class Rule{
    constructor(rule){
        this.rule = rule
    }

    create() {
        try{
            pool.query('Insert into Rules (rule) values (?)', [this.rule])
        }
        catch (e){
            console.log(e)
        }
    }
    delete(id){
        try {
            pool.query('delete from Rules where id=?', [id])
        } catch (e) {
            console.log(e)
        }
    }

    AddRuleToUser(userId, ruleId){
        try {
            pool.query('Insert into Rule_User (ruleId, userId) values (?, ?)', [ruleId, userId])
        } catch (e) {
            console.log(e)
        }
    }

    deleteFromUser(id){
        try {
            pool.query('delete from Rule_User where id=?', [id])
        } catch (e) {
            console.log(e)
        }
    }

    GivePermission(permissionId, ruleId){
        try {
            pool.query('Insert into Rule_Permission (ruleId, permissionId) values (?, ?)', [ruleId, permissionId])
        } catch (e) {
            console.log(e)
        }
    }

    CreatePermission(permission) {
        try{
            pool.query('Insert into Permissions (permission) values (?)', [permission])
        }
        catch (e){
            console.log(e)
        }
    }

    DeletePermissionFromRule(id){
        try {
            pool.query('delete from Rule_Permission where id=?', [id])
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = Rule