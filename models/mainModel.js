const mongoose = require('mongoose');
const { Schema } = mongoose;

const CONNECTION_URL = 'mongodb+srv://akiko:kse4VhApZLJ7wZW3Y18g@cluster0.eu8ky.mongodb.net/cocktaildb?retryWrites=true&w=majority';

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "cocktaildb",
  })

// Your schemas will go here. Replace newSchema with the schema name. 
const cocktailSchema = new Schema({
  // schema info here
  name: {
    type: String, 
    required: true
  },
  ingredients: [
    {
      name: String, 
      oz: Number, 
      mL: Number
    }
  ]
});

// The name of the model you will be referencing throughout project, rename schemaModel. 'dbname' should match the database you are using in Mongo.
const Cocktail = mongoose.model('drink', cocktailSchema);

module.exports = Cocktail;