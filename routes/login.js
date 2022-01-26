var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();


router.post('/',(req,res,next) => {
  passport.authenticate('local',(err,user) => {
    res.send({err,user})
  })(req,res,next)
})

module.exports = router