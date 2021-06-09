const UserModel = require('../models/user')
const file = require('../middleware/file')

class User{

    constructor(){
        this.is = false
    }

    async GetPermEditUsers(id, userId, permissions) {
        var temp;
        const user = new UserModel
        if(userId === id){
            temp = await user.getById(id)
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
                temp = await user.getById(id)
                return {perm: true, data: temp}
            }
            else{
                return {perm: false}
            }
            
        }
    }

    async EditPost(name, id, filedata, email, age){
        console.log(id);
        if(name.length < 2)
            return {perm: false, error: 'Имя должно быть длиннее 2-х символов'}
        if((!filedata) && (file.inFile === true)){
            file.inFile = false
            return {perm: false, error: 'Аватар пользователя должен быть фотографией'}
        }
        try {
            const user = new UserModel(null, email, name, age, filedata.path, id)
            user.edit()
        } catch {
            const user = new UserModel(null, email, name, age, null, id)
            user.edit()
        }
        file.inFile = false
        return {perm: true}
    }

    async deleteUser(id, sessionId, permission){
        if(sessionId === id){
            const user = new UserModel(null, null ,null, null, null, id)
            await user.delete()
            return {isAcс: true}
        }
        else{
            for (let i = 0; i < permission.length; i++) {
                if (permission[i] === "DELETE") {
                    this.is=true
                    break;
                }
            }
            if(this.is){
                const user = new UserModel(null, null ,null, null, null, id)
                await user.delete()
            }
            return {isAcс: false}
        }
    }

}

module.exports = User