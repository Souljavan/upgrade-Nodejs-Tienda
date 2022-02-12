const express = require('express')
const router = express.Router()
const Productos = require('../model/productos');
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


