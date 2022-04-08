const walletModel = require("../models/wallet.model");

 function getInvestorWalletByInvestorId(investor_id) {
    const investorWallet =  walletModel.findOne({ "investor_id":investor_id });
    return investorWallet ? investorWallet : "notFound";
}


module.exports = {
    getInvestorWalletByInvestorId
}