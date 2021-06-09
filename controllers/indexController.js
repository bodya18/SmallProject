const pool = require('../middleware/pool')

exports.GetIndex = (req,res) => {
    pool.query('SELECT * FROM users ORDER BY time DESC')
        .then(data =>{
        res.render('index.hbs', {
            users: data[0],
            title: 'Список пользователей'
        })
        })
        .catch(e =>{
            return console.log(e)
        })
}
