var http = require('http');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var passport = require('passport');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');

var app = express()


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'*'}))
app.use(passport.initialize())
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',require('./routes/index'))
app.use('/login',require('./routes/login'));
app.use('/profile',require('./routes/profile'));
app.use('/message',require('./routes/message'));



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

module.exports = http.createServer(app)

