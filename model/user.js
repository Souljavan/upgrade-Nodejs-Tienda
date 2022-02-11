const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniquevalidator= require('mongoose-unique-validator')

// Creamos el esquema de personajes
const userSchema = new Schema(
    {
      name: { type: String},
      email: { type: String, unique: true },
    password: { type: String},
    role: {type: String}
    },
    {
     collection: 'users'
    }
  );
  
  // Creamos y exportamos el modelo Movies
userSchema.plugin(uniquevalidator, {message:'Este email ya esta siendo usado'})
  module.exports = mongoose.model('User', userSchema);;