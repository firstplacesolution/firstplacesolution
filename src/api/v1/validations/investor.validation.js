const { body, param } = require('express-validator')


exports.validateOnboard = (method) => {
  switch (method) {
    case 'onboard': {
      return [
        body('user_id', 'User Id is Required').not().isEmpty().trim().escape(),
        body('full_name', 'Full Name is Required').not().isEmpty().trim().escape(),
        body('email', 'Email Id is Required').isEmail(),
        body('state', 'State is Required').not().isEmpty().trim().escape(),
        body('city', 'City is Required').not().isEmpty().trim().escape()
      ]
    }
    case 'onboardDetails': {
      return [
        param('user_id', 'User Id is Required').not().isEmpty().trim().escape()
      ]
    }
  }
}

