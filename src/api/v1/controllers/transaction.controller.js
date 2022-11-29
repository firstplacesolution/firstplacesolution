const {
  transactionDetailsByInvestorId,
} = require("../helpers/transaction.helper");
const {
  success,
  unknownError,
  serverValidation,
  badRequest,
} = require("../helpers/response.helper");

const { getInvestorWalletByInvestorId } = require("../helpers/wallet.helper");
const { validationResult } = require("express-validator");
const transactionModel = require("../models/transaction.model");
const walletModel = require("../models/wallet.model");

async function getTransaction(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      serverValidation(res, {
        errorName: "serverValidation",
        errors: errors.array(),
      });
    } else {
      let data = await transactionDetailsByInvestorId(req.params.id);
      success(res, "success", data);
    }
  } catch (error) {
    console.log(error);
    unknownError(res, error);
  }
}
async function updateTransaction(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      serverValidation(res, {
        errorName: "serverValidation",
        errors: errors.array(),
      });
    } else {
      const { id, transaction_status } = req.body;
      const transactionStatusUpdate = await transactionModel.findByIdAndUpdate(id,{ transaction_status:transaction_status });
      if (transactionStatusUpdate) {
        let transictionData = await transactionModel.findById(id)
        if(transictionData.transaction_reason==='withdrawl' && transaction_status==='success'){
          const investorWallet = await getInvestorWalletByInvestorId(transictionData.investor_id)
          const newBaseWalletBalance = parseFloat(investorWallet.reward_wallet) - parseFloat(transictionData.amount);
          const walletBalanceUpdate = await walletModel.findOneAndUpdate({ investor_id:transictionData.investor_id},{ reward_wallet: newBaseWalletBalance });
          success(res, "withdrawal completed",walletBalanceUpdate);
        }else{
        success(res, "Status Updated Successfully")};
      } else {
        badRequest(res, "Invalid Details");
      }
    }
  } catch (error) {
    console.log(error)
    unknownError(res, error);
  }
}

module.exports = {
  getTransaction,
  updateTransaction,
};
