const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const { v4: uuidv4 } = require('uuid');
const urlencodedParser = require('../middleware/urlencodedParser')
const pool = require('../middleware/pool')

const upload = multer({dest:"images"});

router.get('/', (req,res) => {
    res.render('create.hbs', {
        title: 'Создание пользователя'
    })
})

router.post('/', urlencodedParser, upload.single("avatarURL"), (req,res) => {
    if(!req.body) return res.sendStatus(400)
    const name = req.body.name
    const age = req.body.age
    const id = uuidv4()
    const time = new Date()
    try{
        const avatarURL = req.file.path
        pool.query('Insert into users (name, age, id, time, avatarURL) values (?, ?, ?, ?, ?)', [name, age, id, time, avatarURL], (err, data) => {
            if(err) return console.log(err)
            res.redirect(`/user/${id}`)
        })
    }
    catch{
        pool.query('Insert into users (name, age, id, time) values (?, ?, ?, ?)', [name, age, id, time], (err, data) => {
            if(err) return console.log(err)
            res.redirect(`/user/${id}`)
        })
    }

    
})

module.exports = router