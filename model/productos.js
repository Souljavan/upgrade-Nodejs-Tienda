const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const ProductosSchema = new Schema(
    {
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      imagen: { type: String, required: true},
      precio:{ type: Number, required: true},
      categoria: [{ type: mongoose.Types.ObjectId, ref: 'categoria' }]
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const productos = mongoose.model('Productos', ProductosSchema);
  module.exports = productos;