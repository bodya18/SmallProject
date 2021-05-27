const { v4: uuidv4 } = require('uuid');
const User = require('../models/user')

exports.GetCreate = (req,res) => {
    res.render('create.hbs', {
        title: 'Создание пользователя'
    })
}

exports.CreateLogic = (req,res) => {
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
    
}