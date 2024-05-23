const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash') // have require in input tag like that.

//MongoDB connect
mongoose.connect('mongodb+srv://admin:1234@cluster0.twiyy32.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

global.loggedIn = null


//Contraller
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerCotroller')
const homeController = require('./controllers/homeController')
//book
const addBooksController = require('./controllers/addBooksController')
const addNewBooksController = require('./controllers/addNewBooksController')

//backend register login logout
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')


//Middleware
const redirectifAuth = require('./middleware/redirectifAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret:"node secret"
}))
app.set('view engine', 'ejs')

//check after login some thing change webpage
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.get('/', indexController)
app.get('/home',authMiddleware, homeController)
app.get('/login',redirectifAuth, loginController)
app.get('/register', redirectifAuth, registerController)

//book
app.get('/addBooks',authMiddleware,addBooksController)
//post book
app.post('/user/addbooks',authMiddleware,addNewBooksController);
//back end
app.post('/user/register' ,redirectifAuth, storeUserController)
app.post('/user/login' , redirectifAuth, loginUserController) //path from form login action
app.get('/logout' , logoutController) //path from form login action


app.listen(4000,()=>{
    console.log('server is running or App listening n port 4000')
})