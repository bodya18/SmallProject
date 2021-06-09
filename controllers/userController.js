const User = require('../models/user')

exports.GetUser = async (req,res) => {
    const id = req.params.id
    const user = new User
    const temp = await user.getById(id)
    res.render('user.hbs', {
        users: temp, 
        title: 'Профиль',
        thisUserId: id
    })
}
 