const config = require('../middleware/config')
const RuleModel = require(`../models/${config.database}/rule`)
const ConnectionModel = require(`../models/${config.database}/connection`)
const UserModel = require(`../models/${config.database}/user`)

class Role{

    constructor(){
        this.is = false
        this.rule = new RuleModel
        this.user = new UserModel
        this.connection = new ConnectionModel
    }  

    async GetRoles(Perm) {
        for (let i = 0; i < Perm.length; i++) {
            if (Perm[i] === "GIVE") {
                this.is=true
                break;
            }
        }
        if(this.is){
            const rules = await this.rule.GetRoles()
            const users = await this.user.GetUsers()
            return{
                rules,
                users,
                isGet: true
            }
            
        }else{
            return {isGet: false}
        }
        
    }

    async CreateRule(Rol){
        if(Rol.length<3)
            return {
                is:false,
                error: 'Роль должна быть больше 2 символов'
            }
        const data = await this.rule.GetRoleBy('rule', Rol)
        if(data)
            return {
                is:false,
                error: 'Данная роль уже есть'
            }
        await this.rule.create(Rol)
        return {is: true}
    }

    async DeleteRule(id){
        const data = await this.rule.delete(id)
        if(data === false)
            return{isDel: false}
    }

    async GiveRule(user, rule){
        await this.connection.AddRuleToUser(user, rule)
    }
    
    async DeleteRuleFromUser(id){
        await this.connection.deleteFromUser(id)
    }

}

module.exports = Role