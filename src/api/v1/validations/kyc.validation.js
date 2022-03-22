const { body, param } = require('express-validator')


exports.validateKyc = (method) => {
    switch (method) {
        case 'submitKyc': {
            return [
                body('investor_id', 'Investor Id is Required').not().isEmpty().trim().escape(),
                body('dob', 'Date of Birth is Required').not().isEmpty().trim().escape(),
                body('gender', 'Gender is Required').not().isEmpty().trim().escape(),
                body('occupation', 'Occupation is Required').not().isEmpty().trim().escape(),
                body('annual_income', 'Annual Income is Required').not().isEmpty().trim().escape(),
                body('address', 'Address is Required').not().isEmpty().trim().escape(),
                body('postal_code', 'Postal Code is Required').not().isEmpty().trim().escape(),
                body('aadhaar_number', 'Aadhaar Number is Required').not().isEmpty().trim().escape(),
                body('pan_number', 'PAN Number is Required').not().isEmpty().trim().escape(),
                body('aadhaar_front_image', 'Aadhaar Front Image is Required').not().isEmpty().trim().escape(),
                body('aadhaar_back_image', 'Aadhaar Back Image is Required').not().isEmpty().trim().escape(),
                body('pan_front_image', 'PAN Front Image is Required').not().isEmpty().trim().escape(),
                body('selfie', 'Selfie is Required').not().isEmpty().trim().escape(),
            ]
        }
        case 'changeKycStatus': {
            return [
                body('investor_id', 'Investor Id is Required').not().isEmpty().trim().escape(),
                body('status', 'Status is Required').isIn(['Pending', 'Approved', 'Rejected']),
            ]
        }
    }
}

