var express = require('express');
var router = express.Router();

router.get('/',(req,res,next) => {
  res.send('restricted, origin access : http://localhost:3000')
})

module.exports = router