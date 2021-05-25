const {Router} =require('express')
const router = Router()
const pool = require('../middleware/pool')

router.post('/:id', (req,res)=>{
    const id = req.params.id
    pool.query('delete from users where id=?', [id], (err, data) => {
        if (err) return console.log(err)
        res.redirect('/')
    })
})
module.exports = router