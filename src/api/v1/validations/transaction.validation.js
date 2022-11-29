const { body, param } = require('express-validator')


exports.validateTransaction = (method) => {
  switch (method) {
    case 'getAll': {
      return [
        param('id', 'investor Id is Required').not().isEmpty().trim().escape(),
      ]
    }
    case 'update': {
      return [
        body('id', 'Id is Required').not().isEmpty().trim().escape(),
        body('transaction_status', 'Status is Required').not().isEmpty().trim().escape(),
      ]
    }
  }
}