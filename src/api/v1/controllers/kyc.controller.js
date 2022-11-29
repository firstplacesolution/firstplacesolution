/*----------------------------------------models-------------------------------------------------------*/
const kycModel = require("../models/kyc.model");
/*----------------------------------------helpers-------------------------------------------------------*/
const {
  success,
  unknownError,
  serverValidation,
  badRequest,
} = require("../helpers/response_helper");
const { checkInvestorByInvestorId } = require("../helpers/investor.helper");
const { checkKycByInvestorId } = require("../helpers/kyc.helper");
/*----------------------------------------validator-------------------------------------------------------*/
const { validationResult } = require("express-validator");

/*----------------------------------------functions-------------------------------------------------------*/

module.exports = {
  submitKyc: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        serverValidation(res, {
          errorName: "serverValidation",
          errors: errors.array(),
        });
      } else {
        const { investor_id } = req.body;
        let investorDetails = await checkInvestorByInvestorId(investor_id);
        if (!investorDetails) {
          badRequest(res, "Invalid Investor Id");
        } else {
          const kycStatus = await checkKycByInvestorId(investor_id);
          if (!kycStatus) {
            const kycData = new kycModel(req.body);
            kycDetails = await kycData.save();
            success(res, "Investor KYC", kycDetails);
          } else {
            badRequest(res, "KYC already Submitted");
          }
        }
      }
    } catch (error) {
      unknownError(res, error);
    }
  },

  getKycDetails: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        serverValidation(res, {
          errorName: "serverValidation",
          errors: errors.array(),
        });
      } else {
        const investorDetails = await getInvestorDetailsByUserId(
          req.params.user_id
        );
        if (investorDetails == "notFound") {
          badRequest(res, "KYC Details not Found");
        } else {
          success(res, "Onboard Details", investorDetails);
        }
      }
    } catch (error) {
      unknownError(res, error);
    }
  },

  changeKycStatus: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        serverValidation(res, {
          errorName: "serverValidation",
          errors: errors.array(),
        });
      } else {
        const { investor_id, status } = req.body;
        const kycStatusUpdate = await kycModel.findOneAndUpdate(
          { investor_id },
          { status }
        );
        if (kycStatusUpdate) {
          success(res, "Status Updated Successfully");
        } else {
          badRequest(res, "Invalid Details");
        }
      }
    } catch (error) {
      unknownError(res, error);
    }
  },
};
