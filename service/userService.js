const config = require('../middleware/config')
const PermissionModel = require(`../models/${config.database}/permission`)
const UserModel = require(`../models/${config.database}/user`)
const file = require('../middleware/file')
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const ConnectionModel = require(`../models/${config.database}/connection`);
const crypto = require('crypto');

class User{

    constructor(){
        this.user = new UserModel
        this.permission = new PermissionModel
        this.connection = new ConnectionModel
        this.is = false
    }

    async SetStatus(token, num){
        return await this.user.SetStatus(token, num)
    }

    async SetSocialNetw(vk, instagram, facebook, twitter, GitHub, telegram, id){
        return await this.user.SetSocialNetw(vk, instagram, facebook, twitter, GitHub, telegram, id)
    }

    async SetSocialNetwBy(netw, link, id) {
        return await this.user.SetSocialNetwBy(netw, link, id)
    }
    async GetUsers(){
        return await this.user.GetUsers()
    }
    async GetSocialNetw(id){
        return await this.user.GetSocialNetw(id)
    }

    async GetPermEditUsers(id, userId, permissions) {
        var temp;
        if(userId === id){
            temp = await this.user.getById(id)
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
                temp = await this.user.getById(id)
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
            this.user.edit(id, age, filedata.path, name)
        } catch {
            this.user.edit(id, age, null, name)
        }
        file.inFile = false
        return {perm: true}
    }

    async deleteUser(id, sessionId, permission){
        if(sessionId === id){
            await this.user.delete(id)
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
                await this.user.delete(id)
            }
            return {isAcс: false}
        }
    }

    async deleteAvatar(id, sessionId, permission){
        if(sessionId === id){
            await this.user.deleteAvatar(id)
        }
        else{
            for (let i = 0; i < permission.length; i++) {
                if (permission[i] === "DELETE") {
                    this.is=true
                    break;
                }
            }
            if(this.is){
                await this.user.deleteAvatar(id)
            }
        }
    }

    async GetIndex(what, desc = ''){
        return await this.user.SelectOrderBy(what, desc)
    }

    async GetUser(id){
        return await this.user.getById(id)
    }

    async loginLogic(email, passwordBody){

        const data = await this.user.SelectWhere('email', email)
        if(!data)
            return {isAuth: false, error: 'Данного email не существует'}
        else {

            const password = data.password
            const id = data.id
            const areSame = await bcrypt.compare(passwordBody, password)

            if(!areSame)
                return {isAuth: false, error: 'Неверный пароль'}
            
            const permissions = await this.permission.ShowAllPermissions(id)
            return {
                isAuth: true,
                user: data,
                isAuthenticated: true,
                userIden: id,
                Perm: permissions
            }
        }
    }

    async NewPass(token){
        const isToken = await this.user.GetRecToken(token)
        if(!isToken)
            return 'Данного токена не существует'
        const date = Date.now()
        if(isToken.date < date){
            await this.user.delPassToken(token)
            return 'Данный токен устарел'
        }
    }
    async setPass(token, password){
        const isToken = await this.user.GetRecToken(token)
        const date = Date.now()
        if(isToken.date < date)
            return false
        else{
            const user = await this.user.getByEmail(isToken.email)
            const hashPassword = await bcrypt.hash(password, 10)
            await this.user.SetPass(hashPassword, user.token)
            return true
        }
    }

    async getByToken(token){
        return await this.user.GetRecToken(token)
    }
    async delPassToken(token){
        return await this.user.delPassToken(token)
    }
    async recovery(email){
        const buffer = crypto.randomBytes(32)
        const token = buffer.toString('hex')

        const date = Date.now() + 1000*60*60;
        await this.user.recoveryPass(email, token, date)

        return token
    }

    async registerLogic(email, name, password, repeat, age){
        const data = await this.user.SelectWhere('email', email)
        if(data)
            return {isAuth: false, error: 'Данный email уже зарегистрирован'}
        else {
            if(email.length < 2)
                return {isAuth: false, error: 'Введите настоящий email'}
            if(name.length < 2)
                return {isAuth: false, error: 'Имя меньше 2-х символов'}
            if(age < 1)
                return {isAuth: false, error: 'Введите настоящий возраст'}
            if(password.length < 6)
                return {isAuth: false, error: 'Пароль должен быть больше 6 символов'}
            if(password !== repeat)
                return {isAuth: false, error: 'Пароли должны совпадать'}

            const hashPassword = await bcrypt.hash(password, 10)
            const id = uuidv4()
            const buffer = crypto.randomBytes(32)

            const token = buffer.toString('hex')
            await this.user.create(hashPassword, email, name, age, id, token)
            await this.connection.AddRuleToUser(id, 1)
            await this.user.CreateSocialNetwork(id)
            


            const dat = await this.user.getById(id)
            return {
                user: dat,
                isAuth: true,
                id
            }
        }
        
    }

}

module.exports = User