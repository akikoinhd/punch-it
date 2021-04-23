const express = require('express');
const router = express.Router('/routes/mainRouter.js');
const mainController = require('../controller/mainController');


//starter data request route handler
router.get('/', mainController.get, (req, res) => {
  const data = res.locals;
  res.status(200).json(data);
});

router.get('/results', mainController.searchCocktails, (req, res) => {
  res.status(200).json(res.locals.result);
})

router.post('/results/:drinkName', mainController.createCocktail, (req, res) => {
  if (res.locals.error) res.render('Error in middleware' + res.locals.error);
  else res.status(200).json(res.locals);
})

module.exports = router;