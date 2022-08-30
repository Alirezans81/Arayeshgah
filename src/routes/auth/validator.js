const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check('phone')
        .isMobilePhone()
        .withMessage('phone is invalid'),
      check('name')
        .not().isEmpty()
        .withMessage('name cant be empty'),
      check('password')
        .not().isEmpty()
        .withMessage('password cant be empty'),  
    ]
  }

  loginValidator() {
    return [
      check('phone')
        .isMobilePhone()
        .withMessage('phone is invalid'),
      check('password')
        .not().isEmpty()
        .withMessage('password cant be empty'),  
    ]
  }
})();