const pool = require('../middleware/pool')

class User{

    constructor(){
        this.is = false
    }

    async GetPermEditUsers(id, userId, permissions) {
        var temp;
        if(userId === id){
            await pool.query('Select * from users where id=?', [id]) 
                    .then(data =>{
                        temp = data[0][0]
                    })
                    .catch(e =>{
                        return console.log(e);
                    })
            return {perm: true, data: temp}
        }
        else{
    
            for (let i = 0; i < permissions.length; i++) {
                if (permissions[i] === "EDIT") {
                    this.is = true
                    break;
                }
    
            }
            if(this.is){
                await pool.query('Select * from users where id=?', [id]) 
                        .then(data =>{
                            temp = data[0][0]
                        })
                        .catch(e =>{
                            return console.log(e);
                        })
                return {perm: true, data: temp}
            }
            else{
                return {perm: false}
            }
            
        }
    }

    

}

module.exports = User