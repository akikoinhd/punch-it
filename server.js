const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// mongoose DB url
const CONNECTION_URL = 'mongodb+srv://akiko:kse4VhApZLJ7wZW3Y18g@cluster0.eu8ky.mongodb.net/cocktaildb?retryWrites=true&w=majority';
// is this the right thing to put here idk

const PORT = 3000;
const app = express();

const mainRouter = require('./routes/mainRouter.js');

app.use(express.static(__dirname + '/public'));

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.use('/api', mainRouter);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log('Connected to Database')))
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);