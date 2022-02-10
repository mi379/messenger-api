var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();


router.post('/',(req,res,next) => {
  passport.authenticate('local',(err,user) => {
    res.send({err,user})
  })(req,res,next)
})

router.post('/submit',async (req,res,next) => {
  try{
  	var session = dbObject.create(
      dbObject.driver
  	)
  	var {records} = await session.run(
      `match(user:user{username:$username,
      password:$password}) return user`,
      req.body
  	)
  	if(records.length > 0){
  	  var [{_fields}] = records.map((record) => {
  	  	return record
  	  })
      var [{properties}] = _fields.map((_field) => {
        return _field
      })
      res.status(200).send({id : properties.id})
    }
  	else{
      res.status(404).send(
        'user not found'
      )
    }

  }
  catch(err){
  	res.status(500).send(
      'error connection'
    )
  }
})

module.exports = router