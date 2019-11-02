var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Orden = require('../models/Ordenes.js');

/* GET ORDENES listing. */
router.get('/', function(req, res, next) {
  Orden.find(function (err, ordenes) {
    if (err) return next(err);
    res.json(ordenes);
  });
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

module.exports = router;




