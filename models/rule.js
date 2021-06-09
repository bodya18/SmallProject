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
        pool.query('select * from Rule_User where ruleId=?', [id])
            .then(data =>{
                if (!data[0][0])
                    pool.query('delete from Rules where id=?', [id])
            })
            .catch (e => {
                console.log(e)
            })
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

    DeletePermission(id){
        pool.query('select * from Rule_Permission where permissionId=?', [id])
            .then(data=>{
                if (!data[0][0])
                    pool.query('delete from Permissions where id=?', [id])
            })
            .catch(e => {
                console.log(e);
            })
    }

    async ShowAllPermissions(id){
        var temp = []
        await pool.query(`Select DISTINCT Permissions.permission
        from Rules, Permissions, users, Rule_Permission, Rule_User 
        where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id AND users.id = ?`,[id])
                .then(data => {
                    for(let i = 0;i<data[0].length;i++){
                        temp[i] = data[0][i].permission
                    }
                })
                .catch(e=>{
                    return console.log(e)
                })
        return temp;
    }
}

module.exports = Rule