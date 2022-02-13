const express = require('express')
const router = express.Router()
const Productos = require('../model/productos');
const Categorias = require('../model/categorias');
const authorize = require("../middlewares/auth");


router.route('/').get( (req, res, next) => {
    Productos.find()
        .then((productos) => {
            if (productos=="") {
                return res.status(404).json('No se encontro ningun Producto');
            }
            return res.json(productos);
        })
        .catch((error) => {
            next(error)
        })
});

router.route('/ofertas').get( (req, res, next) => {
    Productos.find({'oferta':true})
        .then((productos) => {
            if (productos=="") {
                return res.status(404).json('No se encontro ningun Producto');
            }
            return res.json(productos);
        })
        .catch((error) => {
            next(error)
        })
});

router.route('/masvendido').get( (req, res, next) => {
    Productos.find({'masvendido':true})
        .then((productos) => {
            if (productos=="") {
                return res.status(404).json('No se encontro ningun Producto');
            }
            return res.json(productos);
        })
        .catch((error) => {
            next(error)
        })
});

router.route('/categoria/:nombre').get( (req, res, next) => {
    var nombre = req.params.nombre;
    if (nombre.includes("_")){
       var nombre = nombre.replace('_',' ')
    }
    console.log(nombre)
    Categorias.find({"nombre":nombre})
    .then((categoria) => {
        if (categoria=="") {
            return res.status(404).json('No se encontro ninguna Categoria con ese nombre');
        }
        var idcategoria=categoria[0]._id.toString()
        console.log(idcategoria)

        //busco los productos
        Productos.find({'categoria':idcategoria})
        .then((productos) => {
            if (productos=="") {
                return res.status(404).json('No se encontro ningun Producto');
            }
            return res.json(productos);
        })
        .catch((error) => {
            next(error)
        })
    })
    .catch((error) => {
        next(error)
    })

});


router.route('/:id').get( (req, res, next) => {
    const id = req.params.id;
    Productos.findById(id)
        .then(producto => {
            if (!producto) {
                return res.status(404).json('Producto no encontrado');
            }
            return res.json(producto)
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/').post(authorize, (req, res, next) => {

    const newproductos = new Productos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        precio:req.body.precio,
        Estado:req.body.Estado,
        oferta:req.body.oferta,
        masvendido:req.body.masvendido,
        categoria:req.body.categoria
    });

    newproductos.save()
        .then(() => {
            return res.status(201).json(newproductos);
        }).catch((error) => {
            next(error);
        });

})

router.route('/:id').put(authorize, (req, res, next) => {

    const productoid = req.params.id;
    const productomodificar = new Productos(req.body);
    productomodificar._id = productoid;
    Productos.findByIdAndUpdate(productoid, productomodificar, { new: true })
        .then(prodcutoactualizado => {
            res.status(200).json(prodcutoactualizado);
        })
        .catch(error => {
            next(error);
        });

})

router.route('/:id').delete(authorize, (req, res, next) => {
    const productoid = req.params.id;
    Productos.findByIdAndDelete(productoid)
        .then(() => {
            return res.status(200).json(`Producto con id ${productoid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});



module.exports = router;


