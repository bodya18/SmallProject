const mysql = require('mysql2')

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'usersdb',
    password:'ZAQwsxz1.'
}).promise()