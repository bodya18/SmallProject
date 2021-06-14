const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SessionStore = require('express-mysql-session')
const flash = require('connect-flash')
const indexRouter = require('./routes/indexRouter')
const deleteRouter = require('./routes/deleteRouter')
const editRouter = require('./routes/editRouter')
const sortRouter = require('./routes/sortRouter')
const userRouter = require('./routes/profileRouter')
const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter')
const logoutRouter = require('./routes/logoutRouter')
const ruleRouter = require('./routes/ruleRouter')
const errorHandler = require('./middleware/error')
const varMiddleware = require('./middleware/variables')
const configMiggleware = require('./middleware/config')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helper')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')
app.use(express.static(__dirname))

var options = {
    host: configMiggleware.host,
    user: 'root',
    password: 'ZAQwsxz1.',
    database: 'usersdb'
}

app.use(session({
    secret: configMiggleware.sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(options)
}))

app.use(flash())
app.use(varMiddleware)


app.use('/', indexRouter)
app.use('/sort', sortRouter)
app.use('/delete', deleteRouter)
app.use('/edit', editRouter)
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use('/rules', ruleRouter)
app.use('/admin', express.static('./AdminLTE-3.1.0'))
app.use('/news', express.static('./bootstrap-news-template'))

app.use(errorHandler)

app.listen(configMiggleware.port, () => {
    console.log('Server is waiting connections')
})