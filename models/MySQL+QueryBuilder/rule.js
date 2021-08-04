const pool = require('../../middleware/pool')

class Rule{

    async create(rule) {
        const qb = await pool.get_connection();
        await qb.insert('Rules', {rule})
        qb.release()
    }
    
    async delete(id){
        var temp = true
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({ruleId: id})
            .get('Rule_User');
        if(!response[0])
            await qb.delete('Rules', {id})
        else
            temp = false
        qb.release();
        return temp
    }

    async GetRoles(){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .get('Rules');
        qb.release();
        return response
    }

    async GetRoleBy(what, value){
        let data = {what: value}
        data = JSON.stringify(data)
        data = data.replace(/".*?"/, `"${what}"`)
        data = JSON.parse(data)
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where(data)
            .get('Rules');
        qb.release();
        return response[0]
    }
}

module.exports = Rule