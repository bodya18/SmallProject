const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const pool = require('../middleware/pool')
const urlencodedParser = require('../middleware/urlencodedParser')

const upload = multer({dest:"images"});

router.post('/', urlencodedParser, upload.single("avatarURL"), function (req, res) {
    if(!req.body) return res.sendStatus(400)
    const name = req.body.name
    const age = req.body.age
    const id = req.body.id
    const time = new Date()
    try{
        const avatarURL = req.file.path
        pool.query('update users set name=?, age=?, time=?, avatarURL=? where id=?', [name, age, time, avatarURL, id], (err, data) => {
            if(err) return console.log(err)
            res.redirect(`/user/${id}`)
        })
    }
    catch{
        pool.query('update users set name=?, age=?, time=? where id=?', [name, age, time, id], (err, data) => {
            if(err) return console.log(err)
            res.redirect(`/user/${id}`)
        })
    }
})

router.get('/:id', (req,res) => {
    const id = req.params.id
    pool.query('Select * from users where id=?', [id], (err,data) =>{
        if (err) return console.log(err)
        res.render('edit.hbs', {
            users: data[0], 
            title: 'Редактирование пользователя'
        })
    })
})

module.exports = router