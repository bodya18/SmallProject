const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SessionStore = require('express-mysql-session')
const flash = require('connect-flash')
const path = require('path');
const indexRouter = require('./routes/indexRouter')
const deleteRouter = require('./routes/deleteRouter')
const editRouter = require('./routes/editRouter')
const userRouter = require('./routes/profileRouter')
const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter')
const logoutRouter = require('./routes/logoutRouter')
const ruleRouter = require('./routes/ruleRouter')
const newsRouter = require('./routes/newsRouter')
const adminRouter = require('./routes/adminRouter')
const errorHandler = require('./middleware/error')
const varMiddleware = require('./middleware/variables')
const configMiggleware = require('./middleware/config')

configMiggleware.dirname = __dirname;

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
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

app.use('/users', indexRouter)
// app.use('/sort', sortRouter)
app.use('/delete', deleteRouter)
app.use('/edit', editRouter)
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use('/rules', ruleRouter)
app.use('/admin', adminRouter)
app.use('/news', newsRouter)
app.use('/', (req, res)=>{
    return res.redirect('/news')
})
app.use(errorHandler)

app.listen(configMiggleware.port, () => {
    console.log('Server is waiting connections')
})