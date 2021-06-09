const pool = require('../middleware/pool')
const fs = require('fs')

class User{
    constructor(password, email, name, age, avatarURL, id){
        this.password = password
        this.email = email
        this.name = name
        this.age = age
        this.avatarURL = avatarURL
        this.id = id
        this.time = new Date()
    }

    async edit() {
        try{
            if(this.avatarURL){
                pool.query('Select avatarURL from users where id=?', [this.id]) 
                    .then(data =>{ 
                        if(data[0][0].avatarURL !== null)
                            fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].avatarURL)
                    }) 
                    .catch(e => {
                        return console.log(e)
                    })
                pool.query('update users set name=?, age=?, time=?, avatarURL=? where id=?', [this.name, this.age, this.time, this.avatarURL, this.id])
            }
            else{
                pool.query('update users set name=?, age=?, time=? where id=?', [this.name, this.age, this.time, this.id])
            }
            
        }
        catch (e){
            console.log(e)
        }
    }

    async create() {
        try{
            pool.query('Insert into users (password, email, name, age, id, time, avatarURL) values (?, ?, ?, ?, ?, ?, ?)', [this.password, this.email, this.name, this.age, this.id, this.time, this.avatarURL])
        }
        catch (e){
            console.log(e)
        }
    }
    async delete(){
        pool.query('Select avatarURL from users where id=?', [this.id])
            .then(data => {
                if(data[0][0].avatarURL !== null)
                    fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].avatarURL)
            })
            .catch(e => {
                return console.log(e)
            })

        pool.query('delete from users where id=?', [this.id])
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
                console.log(data[0]);
                temp = data[0][0]
            })
            .catch(e =>{
                return console.log(e)
            })
            console.log(temp);
        return temp;
    }

}

module.exports = User