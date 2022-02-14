var express = require('express');
var router = express.Router();

router.get('/',(req,res,next) => {
  res.send('missing origin acccess')
})

module.exports = router