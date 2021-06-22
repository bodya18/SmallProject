const pool = require('../../middleware/pool')

class Connection{

    async AddRuleToUser(userId, ruleId){
        try {
            await pool.query('Insert into Rule_User (ruleId, userId) values (?, ?)', [ruleId, userId])
        } catch (e) {
            console.log(e)
        }
    }

    async deleteFromUser(id){
        try {
            await pool.query('delete from Rule_User where id=?', [id])
        } catch (e) {
            console.log(e)
        }
    }

    async DeletePermissionFromRule(id){
        try {
            await pool.query('delete from Rule_Permission where id=?', [id])
        } catch (e) {
            console.log(e)
        }
    }

    async GivePermission(permissionId, ruleId){
        try {
            await pool.query('Insert into Rule_Permission (ruleId, permissionId) values (?, ?)', [ruleId, permissionId])
        } catch (e) {
            console.log(e)
        }
    }

    async GetAllConnection(){
        var temp
        await pool.query(`Select Rules.rule, Permissions.permission, users.name, Rule_User.id 
                    from Rules, Permissions, users, Rule_Permission, Rule_User 
                    where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id 
                    AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id`)
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetRulePermission(){
        var temp
        await pool.query(`Select Rules.rule, Permissions.permission, Rule_Permission.id 
                    from Rules, Permissions, Rule_Permission 
                    where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id`)
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetRuleUser(){
        var temp
        await pool.query(`Select users.name, Rules.rule, users.id
                    from users, Rule_User, Rules 
                    where Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id`)
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetRuleID(id, title){
        var temp
        await pool.query(`Select Rule_User.id from Rule_User, Rules where Rule_User.userId = ? AND Rules.rule = ? AND Rules.id = Rule_User.ruleId`, [id, title])
            .then(data => {
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

}

module.exports = Connection