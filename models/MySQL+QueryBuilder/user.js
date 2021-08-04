const pool = require('../../middleware/pool')

class User{

    async delPassToken(token){
        try {
            const qb = await pool.get_connection();
            await qb.delete('recovery', {token})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }

    async SetPass(hashPassword, token){
        try {
            const qb = await pool.get_connection();
            await qb.update('users', {password: hashPassword}, {token})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }
    
    async getByToken(token){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('*')
                .where({token})
                .get('users');
            qb.release();
            return response[0]
        } catch (e) {
            console.log(e);
        }
    }

    async GetRecToken(token){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('*')
                .where({token})
                .get('recovery');
            qb.release();
            return response[0]
        } catch (e) {
            console.log(e);
        }
    }

    async recoveryPass(email, token, date){
        try {
            const qb = await pool.get_connection();
            await qb.insert('recovery', {email, token, date})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }
    async SetStatus(token, num){
        try {
            const qb = await pool.get_connection();
            await qb.update('users', {status: num}, {token})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }

    async SetSocialNetw(vk, instagram, facebook, twitter, GitHub, telegram, id){
        try {
            const qb = await pool.get_connection();
            await qb.update('Social_Network', {vk, instagram, facebook, twitter, GitHub, telegram}, {userId: id})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }

    async SetSocialNetwBy(netw, link, id) {
        try {
            let data = {netw: link}
            data = JSON.stringify(data)
            data = data.replace(/".*?"/, `"${netw}"`)
            data = JSON.parse(data)
            const qb = await pool.get_connection();
            await qb.update('Social_Network', data, {userId: id})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }

    async CreateSocialNetwork(id){
        try {
            const qb = await pool.get_connection();
            await qb.insert('Social_Network', {userId: id})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }
    async GetSocialNetw(id){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('*')
                .where({userId: id})
                .get('Social_Network');
            qb.release();
            return response[0]
        } catch (e) {
            console.log(e);
        }
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
        try {
            const qb = await pool.get_connection();
            await qb.delete('users', {id})
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteAvatar(id){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('avatarURL')
                .where({id})
                .get('users');
            if(response[0].avatarURL !== null){
                await qb.update('users', {avatarURL: null}, {id})
            }
            qb.release();
        } catch (e) {
            console.log(e);
        }
    }

    async getById(id){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('*')
                .where({id})
                .get('users');
            qb.release();
            return response[0]
        } catch (e) {
            console.log(e);
        }
    }
    
    async getByEmail(email){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('*')
                .where({email})
                .get('users');
            qb.release();
            return response[0]
        } catch (e) {
            console.log(e);
        }
    }
    async SelectOrderBy(what, desc = ''){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .order_by(`${what}`, `${desc}`)
                .get('users');
            qb.release();
            return response
        } catch (e) {
            console.log(e);
        }
    }
    
    async SelectWhere(what, how){
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    async GetUsers(){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('*')
                .get('users');
            qb.release();
            return response
        } catch (e) {
            console.log(e);
        }
    }

    async GetUserRoles(id){
        try {
            const qb = await pool.get_connection();
            const response = await qb
                .select('ruleId')
                .where({userId: id})
                .get('Rule_User');
            qb.release();
            return response
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = User