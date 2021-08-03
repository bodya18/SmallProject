const pool = require('../../middleware/pool')

class User{

    async delPassToken(token){
        const qb = await pool.get_connection();
        await qb.delete('recovery', {category: token})
        qb.release();
    }

    async SetPass(hashPassword, token){
        const qb = await pool.get_connection();
        await qb.update('users', {password: hashPassword}, {token})
        qb.release();
    }
    
    async getByToken(token){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({token})
            .get('users');
        qb.release();
        return response[0]
    }

    async GetRecToken(token){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({token})
            .get('recovery');
        qb.release();
        return response[0]
    }

    async recoveryPass(email, token, date){
        const qb = await pool.get_connection();
        await qb.insert('recovery', {email, token, date})
        qb.release();
    }
    async SetStatus(token, num){
        const qb = await pool.get_connection();
        await qb.update('users', {status: num}, {token})
        qb.release();
    }

    async SetSocialNetw(vk, instagram, facebook, twitter, GitHub, telegram, id){
        const qb = await pool.get_connection();
        await qb.update('Social_Network', {vk, instagram, facebook, twitter, GitHub, telegram}, {userId: id})
        qb.release();
    }

    async SetSocialNetwBy(netw, link, id) {
        let data = {netw: link}
        data = JSON.stringify(data)
        data = data.replace(/".*?"/, `"${netw}"`)
        data = JSON.parse(data)
        const qb = await pool.get_connection();
        await qb.update('Social_Network', data, {userId: id})
        qb.release();
    }

    async CreateSocialNetwork(id){
        const qb = await pool.get_connection();
        await qb.insert('Social_Network', {userId: id})
        qb.release();
    }
    async GetSocialNetw(id){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({userId: id})
            .get('Social_Network');
        qb.release();
        return response[0]
    }

    async edit(id, age, avatarURL, name) {
        const qb = await pool.get_connection();        
        try{
            if(avatarURL){
                await qb.update('users', {name, age, avatarURL}, {id})
            }
            else{
                await qb.update('users', {name, age}, {id})
            }
            
        }
        catch (e){
            console.log(e)
        }
        finally{
            qb.release();
        }
        
    }

    async create(password, email, name, age, id, token) {
        try{
            const qb = await pool.get_connection();
            const time = new Date
            await qb.insert('users', {password, email, name, age, id, time, avatarURL: null, token})
            qb.release()
        }
        catch (e){
            console.log(e) 
        }
    }
    async delete(id){
        const qb = await pool.get_connection();
        await qb.delete('users', {id})
        qb.release();
    }

    async deleteAvatar(id){
        const qb = await pool.get_connection();
        const response = await qb
            .select('avatarURL')
            .where({id})
            .get('users');
        if(response[0].avatarURL !== null){
            await qb.update('users', {avatarURL: null}, {id})
        }
        qb.release();
    }

    async getById(id){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({id})
            .get('users');
        qb.release();
        return response[0]
    }
    
    async getByEmail(email){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({email})
            .get('users');
        qb.release();
        return response[0]
    }
    async SelectOrderBy(what, desc = ''){
        const qb = await pool.get_connection();
        const response = await qb
            .order_by(`${what}`, `${desc}`)
            .get('users');
        qb.release();
        return response
    }
    
    async SelectWhere(what, how){
        let data = {what: how}
        data = JSON.stringify(data)
        data = data.replace(/".*?"/, `"${what}"`)
        data = JSON.parse(data)
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where(data)
            .get('users');
        qb.release();
        return response[0]
    }

    async GetUsers(){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .get('users');
        qb.release();
        return response
    }

    async GetUserRoles(id){
        const qb = await pool.get_connection();
        const response = await qb
            .select('ruleId')
            .where({userId: id})
            .get('Rule_User');
        qb.release();
        return response
    }

}

module.exports = User