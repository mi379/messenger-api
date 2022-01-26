var Session = require('../utils/session')
var Driver = require('../utils/driver')
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();


/* GET home page. */
router.get('/',async(req, res, next) => {
  try{
  	var _session = session.create(
      session.driver
  	)
  	res.send(
      session
  	)
  }
  catch(err){
  	res.send(
      err
  	)
  }
});

module.exports = router;
