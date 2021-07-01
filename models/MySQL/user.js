const pool = require('../../middleware/pool')
const fs = require('fs')
const config = require('../../middleware/config');

class User{

    async delPassToken(token){
        await pool.query('delete from recovery where token=?', [token])
    }

    async SetPass(hashPassword, token){
        await pool.query('update users set password=? where token=?', [hashPassword, token])
    }
    
    async getByToken(token){
        var temp;
        await pool.query('Select * from users where token=?', [token])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async GetRecToken(token){
        var temp;
        await pool.query('Select * from recovery where token=?', [token])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async recoveryPass(email, token, date){
        await pool.query('insert into recovery (email, token, date) values (?, ?, ?)', [email, token, date])
    }
    async SetStatus(token, num){
        await pool.query('update users set status=? where token=?', [num, token])
    }

    async SetSocialNetw(vk, instagram, facebook, twitter, GitHub, telegram, id){
        await pool.query('update Social_Network set vk=?, instagram=?, facebook=?, twitter=?, GitHub=?, telegram=? where userId=?', [vk, instagram, facebook, twitter, GitHub, telegram, id])
    }

    async SetSocialNetwBy(netw, link, id) {
        await pool.query(`update Social_Network set ${netw}=? where userId=?`, [link, id])
    }

    async CreateSocialNetwork(id){
        await pool.query('insert into Social_Network (userId) values (?)', [id])
    }
    async GetSocialNetw(id){
        var temp;
        await pool.query('Select * from Social_Network where userId=?', [id])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }

    async edit(id, age, avatarURL, name) {
        try{
            if(avatarURL){
                await pool.query('Select avatarURL from users where id=?', [id]) 
                    .then(data =>{ 
                        if(data[0][0].avatarURL !== null)
                            fs.unlinkSync(`${config.dirname}/`+data[0][0].avatarURL)
                    }) 
                    .catch(e => {
                        return console.log(e)
                    })
                await pool.query('update users set name=?, age=?, avatarURL=? where id=?', [name, age, avatarURL, id])
            }
            else{
                await pool.query('update users set name=?, age=? where id=?', [name, age, id])
            }
            
        }
        catch (e){
            console.log(e)
        }
    }

    async create(password, email, name, age, id, token) {
        try{
            const time = new Date
            await pool.query('Insert into users (password, email, name, age, id, time, avatarURL, token) values (?, ?, ?, ?, ?, ?, ?, ?)', [password, email, name, age, id, time, null, token])
        }
        catch (e){
            console.log(e) 
        }
    }
    async delete(id){
        await pool.query('Select avatarURL from users where id=?', [id])
            .then(data => {
                if(data[0][0].avatarURL !== null)
                    fs.unlinkSync(`${config.dirname}/`+data[0][0].avatarURL)
            })
            .catch(e => {
                return console.log(e)
            })

        await pool.query('delete from users where id=?', [id])
    }

    async deleteAvatar(id){
        await pool.query('Select avatarURL from users where id=?', [id])
            .then(data => {
                if(data[0][0].avatarURL !== null){
                    fs.unlinkSync(`${config.dirname}/` + data[0][0].avatarURL)
                    pool.query('update users set avatarURL=? where id=?', [null, id])
                }
            })
            .catch(e => {
                return console.log(e)
            })
    }

    async getById(id){
        var temp;
        await pool.query('Select * from users where id=?', [id])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    
    async getByEmail(email){
        var temp;
        await pool.query('Select * from users where email=?', [email])
            .then(data => {
                temp = data[0][0];
            })
            .catch(e =>{
                return console.log(e);
            })
        return temp
    }
    async SelectOrderBy(what, desc = ''){
        var temp
        await pool.query(`SELECT * FROM users ORDER BY ${what} ${desc}`)
            .then(data =>{
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e)
            })
        return temp;
    }
    
    async SelectWhere(what, how){
        var temp
        await pool.query(`SELECT * FROM users where ${what} = ?`, [how])
            .then(data =>{
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e)
            })
        return temp;
    }

    async GetUsers(){
        var temp
        await pool.query('Select * from users')
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

    async GetUserRoles(id){
        var temp
        await pool.query('Select ruleId from Rule_User where userId = ?', [id])
            .then(data => {
                temp = data[0]
            })
            .catch(e =>{
                return console.log(e);
            })
        return(temp)
    }

}

module.exports = User