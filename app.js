const express = require('express')
const exphbs = require('express-handlebars')
const indexRouter = require('./routes/index')
const createRouter = require('./routes/create')
const deleteRouter = require('./routes/delete')
const editRouter = require('./routes/edit')
const sortRouter = require('./routes/sort')
const userRouter = require('./routes/user')
const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(express.static(__dirname))


app.use('/', indexRouter)
app.use('/sort', sortRouter)
app.use('/create', createRouter)
app.use('/delete', deleteRouter)
app.use('/edit', editRouter)
app.use('/user', userRouter)


app.listen(3000, () => {
    console.log('Server is waiting connections')
})