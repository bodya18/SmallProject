const express = require('express')
const exphbs = require('express-handlebars')
const indexRouter = require('./routes/indexRouter')
const createRouter = require('./routes/createRouter')
const deleteRouter = require('./routes/deleteRouter')
const editRouter = require('./routes/editRouter')
const sortRouter = require('./routes/sortRouter')
const userRouter = require('./routes/profileRouter')
const errorHandler = require('./middleware/error')
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


app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is waiting connections')
})