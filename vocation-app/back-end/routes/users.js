var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  if(username == 'admin' && password == 'password') {
    res.status(200).json({token: jwt.sign({username}, 'secret')});
  }
  else
    res.status(400).json({message:'username or password failed'});
})
module.exports = router;
