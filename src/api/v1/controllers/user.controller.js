const { success, unknownError, serverValidation, badRequest } = require('../helpers/response.helper');
const { validationResult } = require('express-validator');
const userModel = require("../models/user.model");
const investorModel = require("../models/investor.model");

async function getUserDetailsByToken(token) {
    const userDetails = await userModel.findOne({ token }, {});
    return userDetails ? userDetails : "notFound";
}

async function getInvestorDetailsByUserId(token) {
    const investorDetails = await investorModel.findOne({ user_token: token }, {});
    return investorDetails ? investorDetails : "notFound";
}

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
            // badRequest(res, 'Rate Card Not Found');

        } catch (error) {
            unknownError(res, error);
        }
    },

};