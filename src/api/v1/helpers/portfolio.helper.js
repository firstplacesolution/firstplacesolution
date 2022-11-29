const portfolioModel = require("../models/portfolio.models");

function checkPortfolioByUserId(user_id) {
  const portfolioDetails = portfolioModel.findOne({ user_id });
  return portfolioDetails ? true : false;
}

function checkPortfolioBylocking(lockin) {
  const portfolioDetails = portfolioModel.findOne({ lockin: lockin });
  return portfolioDetails ? true : false;
}

function getPortfolioDetailsByInvestorId(investor_id) {
  const portfolioDetails = portfolioModel.find({ investor_id });
  return portfolioDetails ? portfolioDetails : [];
}

function getPortfolioDetailsBylocking(lockin) {
  const portfolioDetails = portfolioModel.findOne({ lockin: lockin });
  return portfolioDetails ? portfolioDetails : "notFound";
}
function getAllPortfolioDetails() {
  const portfolioDetails = portfolioModel.find().$where(investor_id);
  return portfolioDetails ? portfolioDetails : "notFound";
}

module.exports = {
  checkPortfolioByUserId,
  checkPortfolioBylocking,
  getPortfolioDetailsByInvestorId,
  getPortfolioDetailsBylocking,
  getAllPortfolioDetails,
};
