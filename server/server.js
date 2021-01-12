const express = require ('express');
const hbs = require ('express-handlebars');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const moment = require('moment');
const config = require ('./config/config').get(process.env.NODE_ENV);
const app = express();


// ## HBS SETUP ##
app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:__dirname + './../views/layouts',
    partialsDir:__dirname + './../views/partials'
}))
app.set('view engine', 'hbs')


// ## DB ##
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

// MODELS
const {User} = require ('./models/user');

//MID
app.use('/css', express.static(__dirname + './../public/css'));
app.use('/js', express.static(__dirname + './../public/js'));

app.use(bodyParser.json());
app.use(cookieParser());
// GET
app.get('/', (req,res) =>{
    res.render('home')
})

app.get('/register', (req,res)=>{
   res.render('register') 
})

//POST
app.post('/api/register',(req,res)=>{
    //console.log(req.body)
    const user = new User(req.body);

    user.save((err,doc)=>{
        if (err) res.status(400).send(err);
        res.render('register')
        user.generateToken((err,user)=>{
            if (err) res.status(400).send(err);
            res.cookie('auth', user.token).send('ok');
            
        })
    })
})

app.listen(config.PORT,()=>{
    console.log(`Started at port ${config.PORT}`)
})