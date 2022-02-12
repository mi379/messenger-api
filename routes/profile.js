var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();

router.get('/:id',async (req,res,next) => {
  try{
  	var session = dbObject.create(
      dbObject.driver
  	)
  	var {records} = await session.run(
      `match(profile)-[:profile]->(u:user{id:$id})
      return profile`,req.params
  	)
  	var [{_fields}] = records.map((record) => {
  	  return record
  	})
    var [{properties}] = _fields.map((_field) => {
      return _field
    })
    
    var {id,...profile} = properties;

    res.status(200).send(profile)
  }
  catch(err){
  	res.status(500).send(
      'error connection'
    )
  }
})

module.exports = router