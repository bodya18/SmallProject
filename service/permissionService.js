const config = require('../middleware/config')
const RuleModel = require(`../models/${config.database}/rule`)
const ConnectionModel = require(`../models/${config.database}/connection`)
const PermissionModel = require(`../models/${config.database}/permission`)

class Permission{

    constructor(){
        this.is = false
        this.permission = new PermissionModel
        this.rule = new RuleModel
        this.connection = new ConnectionModel
    } 

    async GetPermissions (Perm){
        for (let i = 0; i < Perm.length; i++) {
            if (Perm[i] === "GIVE") {
                this.is=true
                break;
            }
        }
        if(this.is){
            const rules = await this.rule.GetRoles()
            const permissions = await this.permission.GetPermissions()
    
            return{
                isGet: true,
                rules,
                permissions
            }
    
        }else{
            return {isGet: false}
        }
        
    }

    async GetAllConnection(){
        const Alldata = await this.connection.GetAllConnection()
        const rule_permission = await this.connection.GetRulePermission()
        const rule_user = await this.connection.GetRuleUser()
        return {
            Alldata,
            rule_permission,
            rule_user
        }
    }

    async GivePermission(permissionId, ruleId){
        await this.connection.GivePermission(permissionId,ruleId)
    }

    async CreatePermission(Permission){
        if(Permission.length<3)
            return {
                is: false,
                error: 'Разрешение должно быть больше 2 символов'
            }   
        const data = await this.permission.GetPermissionBy('permission', Permission)
        if(data)
            return {
                is:false,
                error: 'Данное разрешение уже есть'
            }
        await this.permission.CreatePermission(Permission)
        return {is:true}
    }

    async DeletePermissionFromUser(id) {
        await this.connection.DeletePermissionFromRule(id) 
    }

    async DeletePermission(id){
        const data = await this.permission.DeletePermission(id)
        if(data === false)
            return{isDel: false}
    }
}

module.exports = Permission