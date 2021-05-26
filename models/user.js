const pool = require('../middleware/pool')
const fs = require('fs')

class User{
    constructor(name, age, avatarURL, id){
        this.name = name
        this.age = age
        this.avatarURL = avatarURL
        this.id = id
        this.time = new Date()
    }

    edit() {
        try{
            pool.query('Select avatarURL from users where id=?', [this.id], (err, data) =>{
                if(err) return console.log(err)
                if(data[0].avatarURL !== null)
                    fs.unlinkSync('/home/victor/NodeJsProjects/SmallProject/'+data[0].avatarURL)
            })
            pool.query('update users set name=?, age=?, time=?, avatarURL=? where id=?', [this.name, this.age, this.time, this.avatarURL, this.id])
        }
        catch (e){
            console.log(e)
        }
    }

    create() {
        try{
            pool.query('Insert into users (name, age, id, time, avatarURL) values (?, ?, ?, ?, ?)', [this.name, this.age, this.id, this.time, this.avatarURL])
        }
        catch (e){
            console.log(e)
        }
    }
    delete(){
        try {
            pool.query('Select avatarURL from users where id=?', [this.id], (err, data) =>{
                if(err) return console.log(err)
                if(data[0].avatarURL !== null)
                    fs.unlinkSync('/home/victor/NodeJsProjects/SmallProject/'+data[0].avatarURL)
            })
            pool.query('delete from users where id=?', [this.id])

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = User