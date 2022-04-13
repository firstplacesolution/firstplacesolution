const {
  transactionDetailsByInvestorId,
} = require("../helpers/transaction.helper");
const {
  success,
  unknownError,
  serverValidation,
  badRequest,
} = require("../helpers/response.helper");
const { validationResult } = require("express-validator");
const transactionModel = require("../models/transaction.model");

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
      const transactionStatusUpdate = await transactionModel.findByIdAndUpdate(
        id,
        { transaction_status }
      );
      if (transactionStatusUpdate) {
        success(res, "Status Updated Successfully");
      } else {
        badRequest(res, "Invalid Details");
      }
    }
  } catch (error) {
    unknownError(res, error);
  }
}

module.exports = {
  getTransaction,
  updateTransaction,
};
