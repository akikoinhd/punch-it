const Cocktail = require('../models/mainModel');

const mainController = {};

mainController.get = (req, res, next) => {
    Cocktail.find({}, (err, cocktails) => {
        if (err) return next('Error getting cocktails in mainController.get' + JSON.stringify(err));
        res.locals.cocktails = cocktails;
        return next();
    })
};

mainController.searchCocktails = function (req, res, next) {
    console.log('searching for stuff like cocktails this is a string');
    Cocktail.findOne({name: req.query.drinkName}, (err, cocktail) => {
        if (err) {
            res.locals.error = JSON.stringify(err);
            return next();
        }
        if (cocktail !== null) {
            console.log(cocktail);
            return next();
        } else {
            res.locals.notFound = true;
            return next();
        }
    })
}

module.exports = mainController;