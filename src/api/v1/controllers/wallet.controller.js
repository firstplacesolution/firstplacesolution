//----------------------------------------models-----------------------------------------------
const walletModel = require("../models/wallet.model");
//----------------------------------------Helpers-----------------------------------------------
const { success, unknownError, serverValidation, badRequest } = require('../helpers/response.helper');
const { getInvestorWalletByInvestorId } = require("../helpers/wallet.helper");
const {rechagedWalletData} = require('../helpers/transaction.helper')
//--------------------------------------Validation----------------------------------------------
const { validationResult } = require('express-validator');
//----------------------------------------Functions---------------------------------------------

module.exports = {

    getWalletBalance: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const investorWallet = await getInvestorWalletByInvestorId(req.params.investor_id);
                if (investorWallet == "notFound") {
                    badRequest(res, "Investor Wallet not Found");
                } else {
                    success(res, "Investor Wallet", investorWallet)
                }
            }
        } catch (error) {
            unknownError(res, error);
        }
    },

    updateWalletBalance: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const { investor_id, amount } = req.body;
                const investorWallet = await getInvestorWalletByInvestorId(req.body.investor_id);
                if (investorWallet == "notFound") {
                    badRequest(res, "Investor Wallet not Found");
                } else {
                    const newBaseWalletBalance = parseInt(investorWallet.base_wallet) + parseInt(amount);
                    const walletBalanceUpdate = await walletModel.findOneAndUpdate({ investor_id }, { base_wallet: newBaseWalletBalance });
                    if (walletBalanceUpdate) {
                        rechagedWalletData(investor_id,amount);
                        success(res, 'Balance Updated Successfully');
                    } else {
                        badRequest(res, 'Invalid Details')
                    }
                }

            }
        } catch (error) {
            unknownError(res, error);
        }
    },

        }
            