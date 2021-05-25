const {Router} =require('express')
const router = Router()
const pool = require('../middleware/pool')

router.get('/', (req,res) => {
    pool.query('SELECT * FROM users ORDER BY time DESC', (err, data) =>{
        if(err) return console.log(err)
        res.render('index.hbs', {
            users: data,
            title: 'Список пользователей'
        })
    })
})

module.exports = router