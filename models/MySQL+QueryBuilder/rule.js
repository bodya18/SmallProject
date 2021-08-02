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
        await pool.query('select * from Rule_User where ruleId=?', [id])
            .then(data =>{
                if (!data[0][0])
                    pool.query('delete from Rules where id=?', [id])
                else 
                    temp = false
            })
            .catch (e => {
                console.log(e)
            })
        return temp
    }

    async GetRoles(){
        var temp
        await pool.query('Select * from Rules')
            .then(rule => {
                temp = rule[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetRoleBy(what, value){
        var temp
        await pool.query(`SELECT * FROM Rules where ${what} = ?`, [value])
            .then(data =>{
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e)
            })
        return temp;
    }
}

module.exports = Rule