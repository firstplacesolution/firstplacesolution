const transactionModel =  require("../models/transaction.model");

async function rewardData(investor_id,amount) {
    let data={
        investor_id:investor_id,
        transaction_type:"credited",
        amount:amount,
        transaction_reason:"reward",
        transaction_status:"success"
    }
    try {
        let transactionDb = new transactionModel(data)
        transactionDb.save()
        let result = true;
    } catch (error) {
        console.log("trancition db error "+ error);
    }
}
async function rechagedWalletData(investor_id,amount) {
    let data={
        investor_id:investor_id,
        transaction_type:"credited",
        amount:amount,
        transaction_reason:"rechagedWallet",
        transaction_status:"success"
    }
    try {
        let transactionDb = new transactionModel(data)
        transactionDb.save()
        let result = true;
    } catch (error) {
        console.log("transaction db error "+ error);
    }
}
async function intrestData(investor_id,amount) {
    let data={
        investor_id:investor_id,
        transaction_type:"credited",
        amount:amount,
        transaction_reason:"intrest",
        transaction_status:"success"
    }
    try {
        let transactionDb = new transactionModel(data)
        transactionDb.save()
        let result = true;
    } catch (error) {
        console.log("transaction db error "+ error);
    }
}
async function withdrawlData(investor_id,amount) {
    let data={
        investor_id:investor_id,
        transaction_type:"debited",
        amount:amount,
        transaction_reason:"withdrawl",
    }
    try {
        let transactionDb = new transactionModel(data)
        transactionDb.save()
        let result = true;
    } catch (error) {
        console.log("transaction db error "+ error);
    }
}
async function investedData(investor_id,amount) {
    let data={
        investor_id:investor_id,
        transaction_type:"debited",
        amount:amount,
        transaction_reason:"withdrawl",
        transaction_status:"success"
    }
    try {
        let transactionDb = new transactionModel(data)
        transactionDb.save()
        let result = true;
    } catch (error) {
        console.log("transaction db error "+ error);
    }
}
 function transactionDetailsByInvestorId(investor_id) {
    const transactionDetails =  transactionModel.find({ investor_id });
    return transactionDetails ? transactionDetails : [];
}

module.exports = {
    rewardData,
    rechagedWalletData,
    intrestData,
    withdrawlData,
    investedData,
    transactionDetailsByInvestorId
}