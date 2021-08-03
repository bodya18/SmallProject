const pool = require('../../middleware/pool')

class Rule{

    async create(rule) {
        try{
            await pool.query('Insert into Rules (rule) values (?)', [rule])
        }
        catch (e){
            console.log(e)
        }
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