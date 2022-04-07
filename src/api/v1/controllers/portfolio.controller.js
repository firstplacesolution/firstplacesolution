/*----------------------------------------validator-------------------------------------------------------*/
const { validationResult } = require('express-validator');
/*----------------------------------------models-------------------------------------------------------*/
const walletModel = require("../models/wallet.model");
const portfolioModel   = require("../models/portfolio.models")
/*----------------------------------------helpers-------------------------------------------------------*/
const { success, unknownError, serverValidation, badRequest } = require('../helpers/response.helper');
const {getUserDetailsByToken} = require("../helpers/user.helper");
const {getInvestorDetailsByUserId} = require("../helpers/investor.helper");
const {getInvestorWalletByInvestorId} = require("../helpers/wallet.helper")
const {getPortfolioDetailsByInvestorId,getAllPortfolioDetails} = require('../helpers/portfolio.helper');
const { where } = require('../models/wallet.model');


/*----------------------------------------functions-------------------------------------------------------*/
const date = new Date()
let month = date.getMonth()
let year = 
console.log(month)
module.exports = {

    portfolio: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                let { investor_id,amount,rate,lockin } = req.body;
                // const rate = process.env.PORTFOLIO_RATE
                let redirectTo= "onboard";
                
                // let reward = amount*rate/100
                const data = {investor_id:investor_id,amount:amount,rate:rate,lockin:lockin};
                let money = await getInvestorWalletByInvestorId(investor_id)
                if (money.base_wallet<amount) {
                    res.send({status:false,subcode:403,message:'add more money'})
                }else{
                    let invested_amount = parseFloat(money.invested_amount) + parseInt(amount)
                    let newBaseWalletBalance = parseInt(money.base_wallet) - parseInt(amount);
                        const walletBalanceUpdate = await walletModel.findOneAndUpdate({"investor_id":investor_id }, { "base_wallet": newBaseWalletBalance ,"invested_amount":invested_amount});
                        const portfoliData = new portfolioModel(data);
                        await portfoliData.save();
                        if (walletBalanceUpdate) {
                            success(res, 'invested',{data:{amount,rate,lockin,base_wallet:newBaseWalletBalance,total_investment:invested_amount}});
                        } else {
                            badRequest(res, 'Invalid Details')
                        }
                    }
                }        
            // res.json([{status:200,message:"succesfull inveted",data:{token:token,amount:amount,rate:rate,lockin:lockin}}]);
        
        } catch (error) {
            unknownError(res, error);
        }
    },
    getAll: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    const data = await getPortfolioDetailsByInvestorId(req.params.investor_id)
                    success(res, 'Portfolios',{data:data});
                }        
        
        } catch (error) {
            unknownError(res, error);
        }
    },
    removePortfolio: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    const data = await portfolioModel.findOneAndRemove({_id:req.params.portfolio_id})
                    success(res, 'Portfolios deleted',{data:data});
                }        
        
        } catch (error) {
            console.log(error)
            unknownError(res, error);
        }
    }

};
