var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();

router.get('/last/:id',async (req,res) => {
  try{
  	var session = dbObject.create(
      dbObject.driver
  	)
  	var {records} = await session.run(
      `match(senderProfile)-[:profile]->(sender)-[:sendMessage] -(message:message{last:true})-[:message]->
      (receiver)<-[:profile]-(receiverProfile) where sender.id=$id or receiver.id=$id return sender,
      senderProfile,receiver,receiverProfile,message`,req.params
  	)
  	var fields = records.map(({_fields}) => {
  	  return _fields
  	})
  	var properties = fields.map(([s,sP,r,rP,m]) => {
  	  return {
  	  	sender : s.properties,
  	  	senderProfile : sP.properties,
  	  	receiver : r.properties,
  	  	receiverProfile : rP.properties,
  	  	message : m.properties
  	  }
  	})

  	res.status(200).send(properties)
  }
  catch(err){
  	res.status(500).send(
      'error network'
  	)
  }
})

module.exports = router