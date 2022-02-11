const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

// Conexion base de datos
require('./db/db');



const categorias = require('./handlers/categorias')
const productos = require('./handlers/productos')
const usaurios = require('./handlers/user')

//configuracion Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));


//Rutas
app.use('/categorias', categorias)
app.use('/productos', productos)
app.use('/usuarios', usaurios)



  
app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor arrancado`);
    });


// Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});