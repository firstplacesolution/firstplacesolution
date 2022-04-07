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

 async function getALLInvestorID() {
    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        investorModel.find( (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
    // let investorDetails = [];
    //  investorModel.investorModel().then((value)=>{
    //      investorDetails=value
    //  }).catch(err=>{
    //      throw err;
    //  })
    // return investorDetails ? investorDetails :[];
}

module.exports = {
    checkInvestorByUserId,
    checkInvestorByInvestorId,
    getInvestorDetailsByUserId,
    getInvestorDetailsByInvestorId,
    getALLInvestorID
}