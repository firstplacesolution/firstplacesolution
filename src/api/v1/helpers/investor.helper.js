const investorModel = require("../models/investor.model");

async function checkInvestorByUserId(user_id) {
    const investorDetails = await investorModel.findOne({ user_id }, { _id: 1 });
    return investorDetails ? true : false;
}

async function checkInvestorByInvestorId(investor_id) {
    const investorDetails = await investorModel.findOne({ _id : investor_id }, { _id: 1 });
    return investorDetails ? true : false;
}

async function getInvestorDetailsByUserId(user_id) {
    const investorDetails = await investorModel.findOne({ user_id }, {});
    return investorDetails ? investorDetails : "notFound";
}

async function getInvestorDetailsByInvestorId(investor_id) {
    const investorDetails = await investorModel.findOne({ _id : investor_id }, {});
    return investorDetails ? investorDetails : "notFound";
}

module.exports = {
    checkInvestorByUserId,
    checkInvestorByInvestorId,
    getInvestorDetailsByUserId,
    getInvestorDetailsByInvestorId
}