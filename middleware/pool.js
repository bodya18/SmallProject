const mysql = require('mysql2')

module.exports = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'usersdb',
    password:'ZAQwsxz1.'
})