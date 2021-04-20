const { Collection } = require('mongoose');

// rename to model from /models
const cocktailModel = require('../models/mainModel');

const mainController = {};

mainController.get = (req, res, next) => {
  next();
};

module.exports = mainController;