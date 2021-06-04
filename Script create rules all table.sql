use usersdb;
Select Rules.rule, Permissions.permission, users.name
	from Rules, Permissions, users, Rule_Permission, Rule_User
    where Rule_Permission.ruleId = Rules.id AND Rule_Permission.permissionId = Permissions.id AND Rule_User.userId = users.id AND Rule_User.ruleId = Rules.id