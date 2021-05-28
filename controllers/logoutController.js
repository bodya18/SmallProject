exports.GetLogout = (req,res) => {
    req.session.destroy(() =>{
        res.redirect('/login')
    })
}