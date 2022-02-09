var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();

router.get('/currentCity/:id',async(req,res,next) => {
	try{
	  var session = dbObject.create(
      dbObject.driver
    )
    var {records} = await session.run(
      `match(currentCity)<-[:currentCity]-(u:user{
      id:$id}) return currentCity`,req.params
  	)
    
    var fields = records.map(({_fields}) => {
      return _fields.map(({properties}) => {
        return properties
      })
    })

    var properties = fields.map(([{id,...x}]) => {
      return x
    })

    res.status(200).send(properties)
	}
	catch({message}){
	  res.status(500).send(
        message
	  )
	}
})

router.get('/homeTown/:id',async(req,res,next) => {
  try{
    var session = dbObject.create(
      dbObject.driver
    )
    var {records} = await session.run(
      `match(homeTown)<-[:homeTown]-(u:user{
      id:$id}) return homeTown`,req.params
    )

    var result = records.map(({_fields}) => {
      return _fields.map(({properties}) => {
        return properties
      })
    })

    res.status(200).send(result)
  }
  catch({message}){
    res.status(500).send(
        message
    )
  }
})

module.exports = router