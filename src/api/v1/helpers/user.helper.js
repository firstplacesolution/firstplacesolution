const userModel =  require("../models/user.model");

async function checkUserById(user_id){
    const userDetails = await userModel.findOne({ token }, {_id});
    return userDetails ? true : false;
}

async function getUserDetailsByToken(token) {
    const userDetails = await userModel.findOne({ token }, {});
    return userDetails ? userDetails : "notFound";
}

module.exports = {
    checkUserById,
    getUserDetailsByToken
}