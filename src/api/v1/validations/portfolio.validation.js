const { body, param } = require('express-validator')


exports.validatePortfolio = (method) => {
  switch (method) {
    case 'potfolio': {
      return [
        body('amount', 'Amount is Required').not().isEmpty().trim().escape(),
      ]
    }
    case 'getAll': {
      return [
        param('investor_id', 'Invalid Investor ID').not().isEmpty().trim().escape().isLength({min:24,max:24}),
      ]
    }
    case 'delete': {
      return [
        param('portfolio_id', 'Invalid User ID').not().isEmpty().trim().escape().isLength({min:24,max:24}),
      ]
    }
  }
}

