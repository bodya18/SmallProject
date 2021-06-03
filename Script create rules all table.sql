use usersdb;

Create table Rules
(
	id int primary key auto_increment,
    rule varchar(100) unique
);

Create table Permissions
(
	id int primary key auto_increment,
    permission varchar(100) unique
);

create table Rule_User
(
	id int primary key auto_increment,
    ruleId int,
    userId varchar(100),
    FOREIGN KEY (ruleId) REFERENCES Rules (id) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

create table Rule_Permission
(
	id int primary key auto_increment,
    ruleId int,
    permissionId int,
    FOREIGN KEY (ruleId) REFERENCES Rules (id) ON DELETE CASCADE,
    FOREIGN KEY (permissionId) REFERENCES Permissions (id) ON DELETE CASCADE
);