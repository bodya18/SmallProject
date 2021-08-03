const pool = require('../../middleware/pool')

class Connection{

    async AddRuleToUser(userId, ruleId){
        const qb = await pool.get_connection();
        await qb
            .insert('Rule_User', {ruleId, userId})
        qb.release();
    }

    async deleteFromUser(id){
        const qb = await pool.get_connection();
        await qb
            .delete('Rule_User', {id})
        qb.release();
    }

    async DeletePermissionFromRule(id){
        const qb = await pool.get_connection();
        await qb
            .delete('Rule_Permission', {id})
        qb.release();
    }

    async GivePermission(permissionId, ruleId){
        const qb = await pool.get_connection();
        await qb
            .insert('Rule_Permission', {ruleId, permissionId})
        qb.release();
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
        const qb = await pool.get_connection();
        const request = await qb
            .from('Rule_User')
            .select('Rule_User.id')
            .join('Rules', 'Rules.id=Rule_User.ruleId')
            .where('Rules.rule', title)
            .where('Rule_User.userId', id)
        qb.release()
        return request[0]
    }
    
    async UpdateRuleFromUser(id, value){
        const qb = await pool.get_connection();
        await qb.delete('Rule_User', {userId: id})
        for (let i = 0; i < value.length; i++) {
            await qb.insert('Rule_User', {ruleId: value[i], userId: id})
        }
        qb.release();
    }
}

module.exports = Connection