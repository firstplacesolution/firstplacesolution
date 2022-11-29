const { success, unknownError, serverValidation, badRequest } = require('../helpers/response_helper');
const { validationResult } = require('express-validator');
const statesModel = require("../models/states.model");
const citiesModel = require("../models/city.model");

module.exports = {
  getStates: async (req, res) => {
    try {
      const stateDetails = await statesModel
        .find({}, { name: 1, id: 1 })
        .sort({ name: 1 });
      success(res, "States", stateDetails);
    } catch (error) {
      unknownError(res, error);
    }
  },

  getCitiesByStateId: async (req, res) => {
    try {
      const citiesDetails = await citiesModel
        .find({ state_id: req.params.state_id }, { name: 1 })
        .sort({ name: 1 });
      success(res, "Cities", citiesDetails);
    } catch (error) {
      unknownError(res, error);
    }
  },
};
