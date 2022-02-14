var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var passport = require('passport');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');

var app = express()

var bio = require('./routes/bio');
var city = require('./routes/city');
var work = require('./routes/work');
var index = require('./routes/index');
var login = require('./routes/login');
var profile = require('./routes/profile');
var highSchool = require('./routes/highschool');
var university = require('./routes/university')


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize())
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({origin:['http://192.168.1.7:3000','http://localhost:3000']}));



app.use('/',index)
app.use('/bio',bio);
app.use('/city',city);
app.use('/work',work);
app.use('/login',login);
app.use('/profile',profile);
app.use('/highschool',highSchool);
app.use('/university',university);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(
    `${err.status}:${err.message}`
  )
});

module.exports = app;
