const { body, param } = require('express-validator')


exports.validateRegistration = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('token', 'Token is Required').not().isEmpty().trim().escape(),
        body('phone', 'Phone Number Id is Required').not().isEmpty().trim().escape()
      ]
    }
  }
}

