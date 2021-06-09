const pool = require('../middleware/pool')

exports.GetUser = (req,res) => {
    const id = req.params.id
    pool.query('Select * from users where id=?', [id])
        .then(data =>{
            res.render('user.hbs', {
                users: data[0][0], 
                title: 'Профиль',
                thisUserId: id
            })
        })
        .catch(e => {
            console.log(e);
        })
}
 