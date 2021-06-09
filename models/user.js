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

    edit() {
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

    create() {
        try{
            pool.query('Insert into users (password, email, name, age, id, time, avatarURL) values (?, ?, ?, ?, ?, ?, ?)', [this.password, this.email, this.name, this.age, this.id, this.time, this.avatarURL])
        }
        catch (e){
            console.log(e)
        }
    }
    delete(){
        try {
            pool.query('Select avatarURL from users where id=?', [this.id])
                .then(data => {
                    if(data[0][0].avatarURL !== null)
                        fs.unlinkSync('/home/bogdan/NodeJsProjects/SmallProject/'+data[0][0].avatarURL)
                })
                .catch(e => {
                    return console.log(e)
                })

            pool.query('delete from users where id=?', [this.id])

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = User