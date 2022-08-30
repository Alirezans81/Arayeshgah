const winston = require('winston');

module.exports = (err, res, req, next) => {
  winston.error(err.message, err);
  res.status(500).json({message: '(server error) something failed'});
}