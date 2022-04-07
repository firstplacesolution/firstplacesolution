const walletModel = require("../models/wallet.model");

 function getInvestorWalletByInvestorId(investor_id) {
    // console.log("=================Get Investor Wallet ID=========="+investor_id);
    const investorWallet =  walletModel.findOne({ "investor_id":investor_id });
// console.log(investorWallet);
    return investorWallet ? investorWallet : "notFound";
}


module.exports = {
    getInvestorWalletByInvestorId
}