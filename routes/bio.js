var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();

router.get('/:id',async(req,res,next) => {
	try{
	  var session = dbObject.create(
        dbObject.driver
  	  )
  	  var {records} = await session.run(
        `match(bio)<-[:bio]-(u:user{id:$id})
        return bio`,req.params
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