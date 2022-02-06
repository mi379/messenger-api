var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();

router.get('/current/:id',async(req,res,next) => {
	try{
	  var session = dbObject.create(
        dbObject.driver
  	  )
  	  var {records} = await session.run(
        `match(current)<-[:current]-(u:user{
        id:$id}) return current`,req.params
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

router.get('/hometown/:id',async(req,res,next) => {
  try{
    var session = dbObject.create(
        dbObject.driver
      )
      var {records} = await session.run(
        `match(hometown)<-[:hometown]-(u:user{
        id:$id}) return current`,req.params
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