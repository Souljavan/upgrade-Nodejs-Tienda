const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const CategoriaSchema = new Schema(
    {
      nombre: { type: String, required: true },
      estado: { type: String, required: true}
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const categoria = mongoose.model('Categoria', CategoriaSchema);
  module.exports = categoria;