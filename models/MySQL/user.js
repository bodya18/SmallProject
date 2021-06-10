const pool = require('../../middleware/pool')
const fs = require('fs')

class User{
    async edit(id, age, avatarURL, name) {
        try{
            const time = new Date
            if(avatarURL){
                await pool.query('Select avatarURL from users where id=?', [id]) 
                    .then(data =>{ 
                        if(data[0][0].avatarURL !== null)
                            fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].avatarURL)
                    }) 
                    .catch(e => {
                        return console.log(e)
                    })
                await pool.query('update users set name=?, age=?, time=?, avatarURL=? where id=?', [name, age, time, avatarURL, id])
            }
            else{
                await pool.query('update users set name=?, age=?, time=? where id=?', [name, age, time, id])
            }
            
        }
        catch (e){
            console.log(e)
        }
    }

    async create(password, email, name, age, id) {
        try{
            const time = new Date
            await pool.query('Insert into users (password, email, name, age, id, time, avatarURL) values (?, ?, ?, ?, ?, ?, ?)', [password, email, name, age, id, time, null])
        }
        catch (e){
            console.log(e)
        }
    }
    async delete(id){
        await pool.query('Select avatarURL from users where id=?', [id])
            .then(data => {
                if(data[0][0].avatarURL !== null)
                    fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].avatarURL)
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
                    fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/' + data[0][0].avatarURL)
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

}

module.exports = User