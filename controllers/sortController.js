const pool = require('../middleware/pool')

exports.up = (req,res) => {
    const what = req.params.what
    pool.query(`SELECT * FROM users ORDER BY ${what}`)
        .then(data => {
            res.render('index.hbs', {
                users: data[0],
                title: 'Список пользователей'
            })
        })
        .catch(e =>{
            return console.log(e);
        })
}

exports.down = (req,res) => {
    const what = req.params.what
    pool.query(`SELECT * FROM users ORDER BY ${what} DESC`)
        .then(data =>{
            res.render('index.hbs', {
                users: data[0],
                title: 'Список пользователей'
            })
        })
        .catch(e =>{
            return console.log(e);
        })
}