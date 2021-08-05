const pool = require('../../middleware/pool')

class Permission{

    async CreatePermission(permission) {
        const qb = await pool.get_connection();
        await qb
            .insert('Permissions', {permission})
        qb.release();
    }

    async DeletePermission(id){
        var temp = true
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({permissionId: id})
            .get('Rule_Permission');
        if(!response[0])
            await qb.delete('Permissions', {id})
        else
            temp = false
        qb.release();
        return temp
    }

    async ShowAllPermissions(id){
        const qb = await pool.get_connection();
        let temp = []
        var response = await qb
            .distinct()
            .select('Permissions.permission')
            .join('Rule_Permission', 'Rule_Permission.ruleId=Rules.id')
            .join('Permissions', 'Rule_Permission.permissionId=Permissions.id ')
            .join('Rule_User', 'Rule_User.ruleId=Rules.id')
            .join('users', 'Rule_User.userId=users.id')
            .where('users.id', id)
            .get('Rules');
        qb.release()
        for(let i = 0;i<response.length;i++){
            temp[i] = response[i].permission
        }
        return temp;
    }

    async GetPermissions(){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .get('Permissions')
        return response
    }

    async GetPermissionBy(what, value){
        let data = {what: value}
        data = JSON.stringify(data)
        data = data.replace(/".*?"/, `"${what}"`)
        data = JSON.parse(data)
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where(data)
            .get('Permissions');
        qb.release();
        return response[0]
    }
}

module.exports = Permission