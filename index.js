const express =require('express');
const path =require('path');
const hbs =require('express-handlebars');
const expressSession =require('express-session');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const fileUpload = require('express-fileupload');
const connet_mongo = require('connect-mongo');
const connectFlash =require('connect-flash');

require('dotenv').config();


// model part 
const Post =require('./database/models/Post.js');
const User = require('./database/models/User.js');






//controller part 
const HomeController = require('./controllers/HomeController');
const CreatePostController = require('./controllers/CreatePostController');
const SavePostController = require('./controllers/SavePostController');
const singlePostController =require('./controllers/SinglePostController');
const RegisterController =require('./controllers/RegisterController');
const StoreUserController = require('./controllers/StoreUserController');
const LoginController = require('./controllers/LoginController');
const SaveUserLoginController =require('./controllers/SaveUserLoginController');
const LogoutConstroller = require('./controllers/LogoutController');
// middleware part 
const validatePostMiddleware =require('./middleware/validateCreatePost');
const auth = require('./middleware/auth');
const redirectIfAuth =require('./middleware/redirectIfAuth');

/// end controller part
var url = process.env.DB_URI;

mongoose.connect(url,{ useNewUrlParser: true });

const app = new express();
// app use middlewars 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(connectFlash());

// store the user session into mongodb
const mongoStore = connet_mongo(expressSession);
app.use(expressSession({
  secret:process.env.EXPRESS_SESSION_KEY,
  store : new mongoStore({
      mongooseConnection: mongoose.connection
  })
 
}));
app.use('*',(req,res,next)=>{
      
  app.locals.loggedIn = req.session.userId;
  next();
});


// custom middleware 
app.use('/posts/store',validatePostMiddleware);

// view engine setup
app.engine('hbs',hbs({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir:__dirname + '/views/layouts',
  helpers: require("./public/js/helper.js").helpers,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', HomeController);

app.get('/contact',function(req,res){
  res.render('contact');
});

app.get('/post/:id',singlePostController);

app.get('/posts/new',auth,CreatePostController);
 //// post requests 
app.post('/posts/store',auth,SavePostController);
///// user registeration and login handling
app.get('/Register',redirectIfAuth,RegisterController);
app.post('/users/store',redirectIfAuth,StoreUserController);
app.get('/Login',redirectIfAuth,LoginController);
app.post('/user/login',redirectIfAuth,SaveUserLoginController);
app.get('/Logout',auth,LogoutConstroller);
/// 404 page redirect 
app.use((req,res)=> res.render('not_found'));

app.listen(process.env.PORT,() =>{
  console.log("app is listening in 5000 port");
});