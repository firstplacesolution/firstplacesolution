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

function dailyIntrest(portfolio) {
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    amount = 0
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            amount += portfolio.amount*portfolio.rate/100/31
            break;
        case 1:
            if (((year % 4 == 0) && (year % 100!= 0)) || (year %400 == 0)) {
                amount += portfolio.amount*portfolio.rate/100/29
            }else{amount += portfolio.amount*portfolio.rate/100/28}
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            amount += portfolio.amount*portfolio.rate/100/30
    }
    return amount
}

async function updateReward(investerId) {
    let portfolioList = await getPortfolioDetailsByInvestorId(investerId);
    let money=await getInvestorWalletByInvestorId (investerId);
    let totalAmount = 0
    portfolioList.forEach(element => {
        let amount = dailyIntrest(element)
        console.log(amount)
        totalAmount += parseFloat(amount)
    });
    console.log(totalAmount)
    intrestData(investerId,totalAmount)
    let daily_reward = parseFloat(totalAmount)+parseFloat(money.reward_wallet);
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
