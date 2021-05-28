const pool = require('../middleware/pool')

exports.GetUser = (req,res) => {
    const id = req.params.id
    pool.query('Select * from users where id=?', [id], (err,data) =>{
        if (err) return console.log(err)
        res.render('user.hbs', {
            users: data[0], 
            title: 'Профиль',
            thisUserId: id
        })
    })
}
 