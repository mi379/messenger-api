var Session = require('../utils/session')
var Driver = require('../utils/driver')
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();

router.get('/', (req,res) => {
	res.send('/login/')
})

module.exports = router