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
            res.locals.ingredients = [];
            res.locals.measures = [];
            cocktail.ingredients.forEach(el => {
                res.locals.ingredients.push(el.name);
                res.locals.measures.push(`${el.oz}oz/${el.mL}mL`);
            })
            res.locals.result = [res.locals.ingredients, res.locals.measures];
            return next();
        } else {
            res.locals.notFound = true;
            return next();
        }
    })
}

mainController.createCocktail = async function (req, res, next) {
    console.log(`Searching for empty slot for ${req.body}`);
    // if (!res.locals.notFound) {
    //     console.log('This cocktail is already in the database');
    //     return next();
    // }
    try {
        console.log(`Creating cocktail ${req.body.name}, please wait`);
        const newDrink = await Cocktail.create(req.body);
        res.locals = newDrink;
        console.log(res.locals)
        return next();
    } catch (err) {
        res.locals.error = JSON.stringify(err);
    }
}

module.exports = mainController;