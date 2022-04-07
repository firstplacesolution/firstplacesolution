const {getInvestorWalletByInvestorId} = require('../helpers/wallet.helper');
const {getPortfolioDetailsByInvestorId} = require('../helpers/portfolio.helper');
const {getALLInvestorID} = require('../helpers/investor.helper');
const walletModel = require("../models/wallet.model");
const date = new Date();
let year = date.getFullYear()
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

    // console.table("==========="+typeof(money.invested_amount))
    let daily_reward = parseFloat(amount)+parseFloat(money.reward_wallet);
    const walletBalanceUpdate = await walletModel.findOneAndUpdate({"investor_id":investerId }, { "reward_wallet": daily_reward});
}

// function monthCheck(month) {
//     const date = new Date()
// const month = date.getMonth()

// switch (month) {
//     case 0:
//     case 2:
//     case 4:
//     case 6:
//     case 7:
//     case 9:
//     case 11:{
//         a = 5
//         break;
//     }
//     case 1:{
//         if (((year % 4 == 0) && (year % 100!= 0)) || (year%400 == 0)) {
//             a = 6
//         }else{
//             a = 7
//         }
//         break;
//     }
//     case 3:
//     case 5:
//     case 8:
//     case 10:{
//         a = 7
//         break;
//     }
//     default:
//         break;
// }
// console.log(a)

    
// }

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

