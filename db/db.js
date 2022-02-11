const mongoose = require('mongoose');
const DB_URL='mongodb+srv://nodejs:LqbA14tjRxC25KYb@cluster0.449pa.mongodb.net/Tienda?retryWrites=true&w=majority'

const dbConnection = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = dbConnection;