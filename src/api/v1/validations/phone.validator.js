const {body}=require('express-validator');

function validatePhone(){
    
    return[
        body('number','phone number is required').isLength({min:10, max:10}).bail().isMobilePhone(),
        body('ipAddress','ip address is required').isIP(),

    ]
}

module.exports={validatePhone}