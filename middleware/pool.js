const configMiggleware = require('./config')

if(configMiggleware.database === 'MySQL'){
    const mysql = require('mysql2')
    module.exports = mysql.createConnection({
        host: configMiggleware.host,
        user: 'root',
        database: 'usersdb',
        password:'ZAQwsxz1.'
    }).promise()
}
else{
    const QueryBuilder = require('node-querybuilder');
    const settings = {
        host: configMiggleware.host,
        database: 'usersdb',
        user: 'root',
        password: 'ZAQwsxz1.'
    };
    module.exports = new QueryBuilder(settings, 'mysql', 'pool');
}