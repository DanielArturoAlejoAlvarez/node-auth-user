const express=require('express')
const morgan=require('morgan')
const app=express()
const exphbs=require('express-handlebars')
const path=require('path')
const multer=require("multer")

const methodOverride=require('method-override')

const session=require('express-session')

const passport=require('passport')
const flash=require('connect-flash')


const config=require('./config/config')

const { isSwitch, isCase }=require('./helpers/conditionals')


require('./config/passport')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.set('views', path.join(__dirname, 'views'))


//HANDLEBARS TEMPLATES
const hbs=exphbs.create({
  
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',
    helpers: {
        switch: isSwitch,
        case: isCase,
        default: (value,options)=>{
            return true
        }
    }

})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')


//OVERRIDE
app.use(methodOverride('_method'))

//SESSION
app.use(session({
    secret: config.secretKEY,
    resave: true,
    saveUninitialized: true
}))

//PASSPORT
app.use(passport.initialize())
app.use(passport.session())

//FLASH DATA
app.use(flash())

//GLOBAL VARIABLES
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.error=req.flash('error')
    res.locals.user=req.user || null
    next()
})


//ROUTES
app.use('/', require('./routes'))
app.use('/users', require('./routes/users'))
app.use('/notes', require('./routes/notes'))

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')))

module.exports=app
