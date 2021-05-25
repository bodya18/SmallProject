const {Router} =require('express')
const router = Router()
const pool = require('../middleware/pool')

router.get('/up/:what', (req,res) => {
    const what = req.params.what
    pool.query(`SELECT * FROM users ORDER BY ${what}`,  (err, data) =>{
        if(err) return console.log(err)
        res.render('index.hbs', {
            users: data,
            title: 'Список пользователей'
        })
    })
})

router.get('/down/:what', (req,res) => {
    const what = req.params.what
    pool.query(`SELECT * FROM users ORDER BY ${what} DESC`,  (err, data) =>{
        if(err) return console.log(err)
        res.render('index.hbs', {
            users: data,
            title: 'Список пользователей'
        })
    })
})

module.exports = router