const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// mongoose DB url
const CONNECTION_URL = 'mongodb+srv://akiko:kse4VhApZLJ7wZW3Y18g@cluster0.eu8ky.mongodb.net/cocktaildb?retryWrites=true&w=majority';

const PORT = 3000;
const app = express();



//****************************************************************************//

// require routers here
const mainRouter = require('./routes/mainRouter.js');

// handle parsing request body
app.use(express.json());

//******************************************//
// FLOW_TEST
app.use((req, res, next) => {
    console.log(`
    FLOW TEST
    Method: ${req.method}
    URL: ${req.url}
    BODY: ${JSON.stringify(req.body)}
    `);
    return next();
  });
//******************************************//

// do I need to require controllers?
const mainController = require('./controller/mainController');

// serve static files
app.use(express.static(__dirname + '/public'));

// route handler to respond with main app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

// define route handlers here
app.use('/api', mainRouter);

// catch-all route handler for unknown route requests
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
})

// configure express global error handler
app.use(function (err, req, res, next) {
    const defaultErr = {
      log: 'Unknown Middle Error, Bro!',
      status: 400,
      message: { err: 'Punch It is broken.... somewhere?' }, 
    }
    let errorObj = {};
    Object.assign(errorObj, defaultErr);
    errorObj.message.err = err;
    console.log(err.log);
    res.sendStatus(errorObj.status);
    res.json(errorObj.message);
  })


// async function main() {
//   const client = new MongoClient(CONNECTION_URL, {
//          useNewUrlParser: true,
//          useUnifiedTopology: true,
//        });
//   try {
//     await client.connect();
//   } catch (err) {
//     console.error(err);
//   }
// }

// main()

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, () => console.log('Connected to Database, listening on 3000')))
//   .catch((err) => console.log(err.message));
// mongoose.set('useFindAndModify', false);

app.listen(PORT, () => console.log('Connected to Database, listening on 3000'))

module.exports = app;