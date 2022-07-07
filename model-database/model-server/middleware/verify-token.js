const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('x-token');
  try {
    jwt.verify(token, 'secret');
    next();
  } catch(error) {
    res.status(401);
  }
  
}