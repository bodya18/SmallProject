const pool = require('../middleware/pool')

exports.up = (req,res) => {
    const what = req.params.what
    pool.query(`SELECT * FROM users ORDER BY ${what}`,  (err, data) =>{
        if(err) return console.log(err)
        res.render('index.hbs', {
            users: data,
            title: 'Список пользователей'
        })
    })
}

exports.down = (req,res) => {
    const what = req.params.what
    pool.query(`SELECT * FROM users ORDER BY ${what} DESC`,  (err, data) =>{
        if(err) return console.log(err)
        res.render('index.hbs', {
            users: data,
            title: 'Список пользователей'
        })
    })
}