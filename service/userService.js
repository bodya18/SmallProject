const pool = require('../middleware/pool')

class User{

    constructor(){
        this.is = false
    }

   async GetPermEditUsers(id, userId, permissions) {
       console.log(id, userId, permissions);
        if(userId === id){
            await pool.query('Select * from users where id=?', [id]) 
                .then(data =>{
                    console.log('===========================');
                    console.log(123);
                    console.log('===========================');
                    return {perm: true, data: data[0][0]}
                })
                .catch(e =>{
                    return console.log(e);
                })
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
                    return {perm: true, data: data[0][0]}
                })
                .catch(e =>{
                    return console.log(e);
                })
    
            }
            else{
                return {perm: false}
            }
        }
        console.log('===========================');
        console.log(321);  
        console.log('===========================');  
    }
}
module.exports = User