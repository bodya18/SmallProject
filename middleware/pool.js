const configMiggleware = require('./config')

const settings = {
    host: configMiggleware.host,
    database: 'news',
    user: 'root',
    password: 'zaqwsxz1.',
};
if(configMiggleware.database === 'MySQL'){
    const mysql = require('mysql2')
    module.exports = mysql.createConnection(settings).promise()
}
if(configMiggleware.database === 'MySQL+QueryBuilder'){
    const QueryBuilder = require('node-querybuilder');
    module.exports = new QueryBuilder(settings, 'mysql', 'pool');
}