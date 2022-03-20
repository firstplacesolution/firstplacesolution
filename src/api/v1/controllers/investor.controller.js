const { success, unknownError, serverValidation, badRequest } = require('../helpers/response.helper');
const { validationResult } = require('express-validator');
const investorModel = require("../models/investor.model");
const { checkInvestorByUserId , getInvestorDetailsByUserId } = require("../helpers/investor.helper")


module.exports = {

    onboard: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const { user_id, full_name, profile, email, state, city, referral_code, } = req.body;
                let investorDetails = await checkInvestorByUserId(user_id);
                if (!investorDetails) {
                    const investorData = new investorModel(req.body);
                    investorDetails = await investorData.save();
                    success(res, 'User Onboard', investorDetails);
                } else {
                    badRequest(res, "User Already Registered");
                }
            }
        } catch (error) {
            unknownError(res, error);
        }
    },

    getOnboardDetails : async (req,res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const investorDetails = await getInvestorDetailsByUserId(req.params.user_id);
                if(investorDetails == "notFound"){
                    badRequest(res , "Onboard Details not Found");
                }else{
                    success(res , "Onboard Details" , investorDetails)
                }                
            }
        }catch(error){
            unknownError(res, error);
        }
    }
};