var express=require('express');
var passport=require('passport');
var bodyParser=require('body-parser');
var router=require('./routes/Routing');
var myErrorLogger = require('./public/javascripts/ErrorLogger');
var myRequestLogger = require('./public/javascripts/RequestLogger');
var session=require('express-session');
var jwt=require('jsonwebtoken');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(myRequestLogger);

app.use(session({
    secret: 'sachin',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true , maxAge:10000*60*60*24}
  }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  //require('./config/passport')(passport);
  app.use(bodyParser.urlencoded({ extended: true }));  

app.use('/', router);

app.use(myErrorLogger);

app.listen(1020);
console.log("Server listening in port 1020");