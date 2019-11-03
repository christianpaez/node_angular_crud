var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Orden = require('../models/Ordenes.js');

/* GET /ordenes listing. */
router.get('/', function(req, res, next) {
  Orden.find(function (err, ordenes) {
    if (err) return next(err);
    res.json(ordenes);
  });
});

/* GET /ordernes/:id listing. */
router.get('/:id', function(req, res, next) {
  Orden.findById(req.params.id)
  .then((orden)=> res.json(orden))
  .catch((error)=> res.status(400).json(error))
});

/* POST /ordenes Create */
router.post('/', function(req, res, next) {
  Orden.create(req.body, function (err, orden) {
    if (err) {
      res.json(err)
      return next(err);}
    res.json(orden);
  });
});

//PUT /ordenes/:id 
router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  const valor = req.body.valor;
  const estado = req.body.estado;
  console.log(req.body)
  Orden.findByIdAndUpdate(id, 
    {
      valor: valor,
      estado: estado }, {new: true, runValidators: true})
    .then((order)=>{res.json(order)})
    .catch((error)=>res.status(400).json(error))
});

//GET /ordenes/:id/items
router.get('/:id/items', function(req, res, next) {
  Orden.findById(req.params.id)
  .then((orden)=> res.json(orden.items))
  .catch((error)=> res.status(400).json(error))
});

//POST /ordenes/:id/items
router.post('/:id/items',function(req, res, next) {
  Orden.findById(req.params.id)
  .then((orden) => {
      if (orden != null) {
          orden.items.push(req.body);
          orden.save()
          .then((orden) => {
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json(orden);
          }, (err) => next(err));
      }
      else {
          error = new Error('Orden ' + req.params.id + ' No encontrada');
          error.status = 404;
          return next(err);
      }
  }, (error) => next(error))
  .catch((error) => next(error));
})

//DELETE /ordenes/:idOrden/items/:idItem
router.delete('/:idOrden/items/:idItem', function(req, res, next) {
    Orden.findById(req.params.idOrden)
      .then((orden) => {
        if (orden != null && orden.items.id(req.params.idItem) != null) {
        orden.items.id(req.params.idItem).remove();
            orden.save()
            .then((orden) => {
                    Orden.findById(orden.id)
                    .then(()=>{
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json(orden);
                    })  
            }, (error) => next(error));
        }
        else if (orden == null) {
            error = new Error('Orden ' + req.params.idOrden + ' No encontrada');
            error.status = 404;
            return next(error);
        }
        else if (orden.items.id(req.params.idItem) == null) {
            error = new Error('Item ' + req.params.idItem + ' no encontrado');
            error.status = 404;
            return next(error);            
        }
    }, (error) => next(error))
    .catch((error) => next(error));
});


module.exports = router;




