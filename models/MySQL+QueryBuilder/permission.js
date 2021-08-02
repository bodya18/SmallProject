const pool = require('../../middleware/pool')

class Permission{

    async CreatePermission(permission) {
        try{
            await pool.query('Insert into Permissions (permission) values (?)', [permission])
        }
        catch (e){
            console.log(e)
        }
    }

    async DeletePermission(id){
        var temp = true
        await pool.query('select * from Rule_Permission where permissionId=?', [id])
            .then(data=>{
                if (!data[0][0])
                    pool.query('delete from Permissions where id=?', [id])
                else temp = false
            })
            .catch(e => {
                console.log(e);
            })
            return temp
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

    async GetPermissions(){
        var temp
        await pool.query('Select * from Permissions')
            .then(rule => {
                temp = rule[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetPermissionBy(what, value){
        var temp
        await pool.query(`SELECT * FROM Permissions where ${what} = ?`, [value])
            .then(data =>{
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e)
            })
        return temp;
    }
}

module.exports = Permission