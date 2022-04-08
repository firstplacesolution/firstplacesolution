//----------------------------------------models-----------------------------------------------
const walletModel = require("../models/wallet.model");
//----------------------------------------helpers----------------------------------------------
const {getInvestorWalletByInvestorId} = require('../helpers/wallet.helper');
const {getPortfolioDetailsByInvestorId} = require('../helpers/portfolio.helper');
const {getALLInvestorID} = require('../helpers/investor.helper');
const {intrestData} = require('../helpers/transaction.helper')
//----------------------------------------setDate----------------------------------------------
const date = new Date();
let year = date.getFullYear()
//----------------------------------------Function---------------------------------------------
async function investorID() {
    let list=[];
    let value = await  getALLInvestorID()
    value.map(element => {
        list.push(element.id)
    });
    return list;
}

async function updateReward(investerId) {
    let portfolioList = await getPortfolioDetailsByInvestorId(investerId);
    let money=await getInvestorWalletByInvestorId (investerId);
    let amount = 0
    portfolioList.forEach(element => {
        if (((year % 4 == 0) && (year % 100!= 0)) || (year %400 == 0)) {
            amount += element.amount*element.rate/100/366
        }else{amount += element.amount*element.rate/100/365}
    });
    intrestData(investerId,amount)
    let daily_reward = parseFloat(amount)+parseFloat(money.reward_wallet);
    const walletBalanceUpdate = await walletModel.findOneAndUpdate({"investor_id":investerId }, { "reward_wallet": daily_reward});
}

async function rewardDistribution() {
    let list = await investorID();
    list.forEach(element => {
        updateReward(element).then((result)=>{
            console.log("========done=======")
        })
    });
}


module.exports={rewardDistribution}
