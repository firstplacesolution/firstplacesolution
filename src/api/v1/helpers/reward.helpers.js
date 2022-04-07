const {getInvestorWalletByInvestorId} = require('../helpers/wallet.helper');
const {getPortfolioDetailsByInvestorId} = require('../helpers/portfolio.helper');
const {getALLInvestorID} = require('../helpers/investor.helper');
const walletModel = require("../models/wallet.model");

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
        amount += element.return
    });

    // console.table("==========="+typeof(money.invested_amount))
    let daily_reward = parseFloat(amount)+parseFloat(money.reward_wallet);
    const walletBalanceUpdate = await walletModel.findOneAndUpdate({"investor_id":investerId }, { "reward_wallet": daily_reward});
}

async function rewardDistribution() {
    let list = await investorID();
    // console.log(list)
    list.forEach(element => {
        updateReward(element).then((result)=>{
            console.log("========done=======")
        })
    });
}
// rewardDistribution()
// 0.416666667
// let a =[];  

// investorID();

// .then((result)=>{
//     a=result;
// })
// console.log(a)


module.exports={rewardDistribution}
//   InvestorID: () => {
//     let investmentIdList = [];

    // getALLInvestorID().then((data) => {

    //   investmentIdList = data.map(function (element) {
    //     return element.id;
    //   });
//       investmentIdList.forEach((element) => {
//         const investorWalletData = getInvestorWalletByInvestorId(element).then(
//           (wallet) => {
//             const investorPortfolioData = getPortfolioDetailsByInvestorId(
//               element
//             ).then((result) => {
//               const sumOfPortfolioAmount = result
//                 .map((item) => item.amount)
//                 .reduce((prev, curr) => prev + curr, 0);
//               let rewardYearly = parseFloat(
//                 (sumOfPortfolioAmount * process.env.PORTFOLIO_RATE) /
//                   100 /
//                   12 /
//                   30
//               );
//               const newBaseWalletBalance =
//                 parseFloat(wallet.reward_wallet) + parseFloat(rewardYearly);
//               console.log(investmentIdList);
//               walletModel.findOneAndUpdate(
//                 element,
//                 { reward_wallet: newBaseWalletBalance },
//                 (err, doc) => {
//                   console.log(doc);
//                 }
//               );
//             });
//             // .then((invertmentWallet)=>{
//             //    .then(function (list) {
//             //         list.forEach(block => {
//             //             investedAmount += block.amount
//             //         });
//             //         let rewardYearly = parseFloat(investedAmount*process.env.PORTFOLIO_RATE/100/12/30)
//             //         const newBaseWalletBalance = parseFloat(invertmentWallet.reward_wallet) + parseFloat(rewardYearly);
//             //         console.log(invertmentWallet.reward_wallet,newBaseWalletBalance,element)

//             //         if(err){
//             //             console.log("ERR",err);

//             //         }
//             //         console.log(doc);                        });
//             //     })
//             //         })
//           }
//         );
//       });
//     });
//   },

