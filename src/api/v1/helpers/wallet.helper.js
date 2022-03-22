const walletModel = require("../models/wallet.model");

async function getInvestorWalletByInvestorId(investor_id) {
    const investorWallet = await walletModel.findOne({ investor_id }, { base_wallet: 1 , reward_wallet : 1 });
    return investorWallet ? investorWallet : "notFound";
}

module.exports = {
    getInvestorWalletByInvestorId
}