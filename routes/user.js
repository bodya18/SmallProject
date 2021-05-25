const {Router} =require('express')
const router = Router()
const multer  = require("multer");
const pool = require('../middleware/pool')
const urlencodedParser = require('../middleware/urlencodedParser')

const upload = multer({dest:"images"});

router.get('/:id', (req,res) => {
    const id = req.params.id
    pool.query('Select * from users where id=?', [id], (err,data) =>{
        if (err) return console.log(err)
        res.render('user.hbs', {
            users: data[0], 
            title: 'Профиль'
        })
    })
})

module.exports = router