/*----------------------------------------validator-------------------------------------------------------*/
const { validationResult } = require('express-validator');
/*----------------------------------------models-------------------------------------------------------*/
const userModel = require("../models/user.model");
/*----------------------------------------helpers-------------------------------------------------------*/
const { success, unknownError, serverValidation, badRequest } = require('../helpers/response.helper');
const {getUserDetailsByToken} = require("../helpers/user.helper");
const {getInvestorDetailsByUserId} = require("../helpers/investor.helper");


/*----------------------------------------functions-------------------------------------------------------*/
module.exports = {

    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const { token } = req.body;
                let userDetails = await getUserDetailsByToken(token);
                let redirectTo= "onboard";
                if (userDetails == "notFound") {
                    const userData = new userModel(req.body);
                    userDetails = await userData.save(); 
                } else {
                    const investorDetails = await getInvestorDetailsByUserId(userDetails._id);
                    if(investorDetails != "notFound"){
                        redirectTo = "dashboard";
                    }
                }
                success(res, 'User Registration', { redirectTo, userDetails });
            }
        } catch (error) {
            unknownError(res, error);
        }
    },

};

// 6242effc4cabb4ba2a23a9e2