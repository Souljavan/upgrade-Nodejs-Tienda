const express = require('express')
const router = express.Router()
const Categorias = require('../model/categorias');
const authorize = require("../middlewares/auth");


router.route('/').get((req, res, next) => {
    Categorias.find({'estado':"activa"})
        .then((categoria) => {
            if (categoria=="") {
                return res.status(404).json('No se encontro ninguna Categoria');
            }
            return res.json(categoria);
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/:id').get((req, res, next) => {
    const id = req.params.id;
    Categorias.findById(id)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).json('Categoria no encontrada');
            }
            return res.json(categoria)
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/').post(authorize, (req, res, next) => {

    const newCategoria = new Categorias({
        nombre: req.body.nombre,
        estado:req.body.estado
    });

    newCategoria.save()
        .then(() => {
            return res.status(201).json(newCategoria);
        }).catch((error) => {
            next(error);
        });

})

router.route('/:id').put(authorize, (req, res, next) => {

    const categoriaid = req.params.id;
    const categoriamodificar = new Categorias(req.body);
    categoriamodificar._id = categoriaid;
    Categorias.findByIdAndUpdate(categoriaid, categoriamodificar, { new: true })
        .then(catactualizado => {
            res.status(200).json(catactualizado);
        })
        .catch(error => {
            next(error);
        });

})




router.route('/:id/').delete(authorize, (req, res, next) => {
    const gimnasioid = req.params.id;
    Gimnasio.findByIdAndDelete(gimnasioid)
        .then(() => {
            return res.status(200).json(`Gimnasio con id ${gimnasioid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});





module.exports = router;