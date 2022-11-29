const walletModel = require("../models/wallet.model");

async function getInvestorWalletByInvestorId(investor_id) {
    const investorWallet = await walletModel.findOne({ "investor_id":investor_id });
    return investorWallet ? investorWallet : "notFound";
}


module.exports = {
    getInvestorWalletByInvestorId
}