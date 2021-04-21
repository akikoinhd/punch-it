const { Collection } = require('mongoose');

// rename to model from /models
const Cocktail = require('../models/mainModel');

const mainController = {};

mainController.get = (req, res, next) => {
  next();
};

mainController.createCocktail1 = async (req, res, next) => {
    const { name, fields } = req.body;
    if (!name || !fields) return next('Must fill out both fields to continue to Cocktail Creator')
    try {
        res.locals.name = name;
        return next();
    } catch (err) {
        res.render({ error: err });
    }

}

mainController.createCocktail2 = async (req, res, next) => {
    next();
}

module.exports = mainController;