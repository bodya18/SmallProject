exports.GetAdmin = async (req,res) => {
    res.render('./AdminLTE-3.1.0/index.hbs', {
        title: 'Список пользователей',
        isAdmin: true
    })
}