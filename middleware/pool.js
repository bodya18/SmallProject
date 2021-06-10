const mysql = require('mysql2')
const configMiggleware = require('./config')

module.exports = mysql.createConnection({
    host: configMiggleware.host,
    user: 'root',
    database: 'usersdb',
    password:'ZAQwsxz1.'
}).promise()