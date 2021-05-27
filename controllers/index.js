const pool = require('../middleware/pool')

exports.index = (req,res) => {
    pool.query('SELECT * FROM users ORDER BY time DESC', (err, data) =>{
        if(err) return console.log(err)
        res.render('index.hbs', {
            users: data,
            title: 'Список пользователей'
        })
    })
}