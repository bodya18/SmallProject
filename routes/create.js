const {Router} = require('express')
const router = Router()
const multer  = require("multer");
const { v4: uuidv4 } = require('uuid');
const urlencodedParser = require('../middleware/urlencodedParser')
const User = require('../models/user')

const upload = multer({dest:"images"});

router.get('/', (req,res) => {
    res.render('create.hbs', {
        title: 'Создание пользователя'
    })
})

router.post('/', urlencodedParser, upload.single("avatarURL"), async (req,res) => {
    if(!req.body) return res.sendStatus(400)
    const id = uuidv4()
    
    if(req.body.name.length < 3)
        return res.redirect(`/create`)

    try {
        const user = new User(req.body.name, req.body.age, req.file.path, id)
        user.create()
    } catch {
        const user = new User(req.body.name, req.body.age, null, id)
        user.create()
    }
    function redirect() {
        res.redirect(`/user/${id}`)
    }
    setTimeout(redirect, 200)
    
})

module.exports = router