const UserModel = require('../models/user')
const file = require('../middleware/file')
const bcrypt = require('bcryptjs');
const RuleModel = require('../models/rule');

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

    async GetIndex(what, desc = ''){
        const user = new UserModel();
        return await user.SelectOrderBy(what, desc)
    }

    async GetUser(id){
        const user = new UserModel
        return await user.getById(id)
    }

    async loginLogic(email, passwordBody){
        var user = new UserModel
        const data = await user.SelectWhere('email', email)
        
        if(!data)
            return {isAuth: false, error: 'Данного email не существует'}
        else {
            const password = data.password
            const id = data.id
            const email = data.email
            const name = data.name
            const age = data.age
            const avatarURL = data.avatarURL
            const areSame = await bcrypt.compare(passwordBody, password)
            if(!areSame)
                return {isAuth: false, error: 'Неверный пароль'}
            var user = new UserModel(password, email, name, age, avatarURL, id)
            const rule = new RuleModel
            const permissions = await rule.ShowAllPermissions(id)

            return {
                isAuth: true,
                user: user,
                isAuthenticated: true,
                userIden: id,
                Perm: permissions
            }
        }
    }

}

module.exports = User