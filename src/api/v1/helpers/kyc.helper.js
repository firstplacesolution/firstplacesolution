const kycModel = require("../models/kyc.model");

async function checkKycByInvestorId(investor_id) {
  const investorDetails = await kycModel.findOne({ investor_id }, { _id: 1 });
  return investorDetails ? true : false;
}

module.exports = {
  checkKycByInvestorId,
};
