var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var cors = require('cors')


var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile')
var bioRouter = require('./routes/bio');
var highSchool = require('./routes/highschool');
var university = require('./routes/university')
var city = require('./routes/city');
var work = require('./routes/work');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin : ['http://localhost:3000'] }));
app.use(passport.initialize())

app.use('/login',loginRouter);
app.use('/profile',profileRouter);
app.use('/bio',bioRouter);
app.use('/highschool',highSchool);
app.use('/university',university);
app.use('/city',city);
app.use('/work',work);



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
