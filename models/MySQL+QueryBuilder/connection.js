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
        const qb = await pool.get_connection();
        var p2 = new Promise(async function(resolve, reject) {
            await qb
            .from('Rules')
            .select('Rules.rule, Permissions.permission, users.name, Rule_User.id')
            .join('Rule_Permission', 'Rule_Permission.ruleId=Rules.id')
            .join('Permissions', 'Rule_Permission.permissionId=Permissions.id')
            .join('Rule_User', 'Rule_User.ruleId=Rules.id')
            .join('users', 'Rule_User.userId=users.id')
            .get((err, data)=>{
                resolve(data);
            });
            qb.release()
        });
        return await p2.then(function(value) {
            return value
        })
    }

    async GetRulePermission(){
        const qb = await pool.get_connection();
        var p2 = new Promise(async function(resolve, reject) {
            await qb
            .from('Rules')
            .select('Rules.rule, Permissions.permission, Rule_Permission.id')
            .join('Rule_Permission', 'Rule_Permission.ruleId=Rules.id')
            .join('Permissions', 'Rule_Permission.permissionId=Permissions.id')
            .get((err, data)=>{
                resolve(data);
            });
            qb.release()
        });
        return await p2.then(function(value) {
            return value
        })
    }

    async GetRuleUser(){
        const qb = await pool.get_connection();
        var p2 = new Promise(async function(resolve, reject) {
            await qb
            .from('Rule_User')
            .select('users.name, Rules.rule, users.id')
            .join('users', 'Rule_User.userId=users.id')
            .join('Rules', 'Rule_User.ruleId=Rules.id')
            .get((err, data)=>{
                resolve(data);
            });
            qb.release()
        });
        return await p2.then(function(value) {
            return value
        })
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