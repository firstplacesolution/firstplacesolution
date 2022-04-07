const { body, param } = require('express-validator')


exports.validateWallet = (method) => {
    switch (method) {
        case 'getBalance': {
            return [
                param('investor_id', 'Investor Id is Required').not().isEmpty().trim().escape()
            ]
        }
        case 'updateWalletBalance': {
            return [
                body('investor_id', 'Investor Id is Required').not().isEmpty().trim().escape(),
                body('amount', 'Amount is Required').not().isEmpty().trim().escape()
            ]
        }
        case 'updateRewardWallet': {
            return [
                body('investor_id', 'Investor Id is Required').not().isEmpty().trim().escape(),
            ]
        }
    }
}

