const express = require('express');
const router = express.Router('/routes/mainRouter.js');
const mainController = require('../controller/mainController');


//starter data request route handler
router.get('/', mainController.get, (req, res) => {
  const data = res.locals;
  res.status(200).json(data);
});

router.get('/results', mainController.searchCocktails, (req, res) => {
  res.status(200).json(res.locals);
  res.send(res.locals);
})

module.exports = router;