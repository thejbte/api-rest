'use strict'

//rutas
const express = require ( 'express');
const ProductCtrl = require('../controllers/product')
const api = express.Router()


api.get('/product', ProductCtrl.getProducts );

//obtener productId
// GET http://localhost:3001/api/product/615a59cdbd5e4153215155ef
api.get('/product/:productId', ProductCtrl.getProduct);

//colocar algo
//POST http://localhost:3001/api/product
api.post('/product', ProductCtrl.saveProduct );


//actualizar productId
api.put('/product/:productId', ProductCtrl.updateProduct );

//borrar el productId req y res es de express
api.delete('/product/:productId', ProductCtrl.deleteProduct );

module.exports = api;