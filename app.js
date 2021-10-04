'use strict'

//funcionalidad de express - server

const express = require('express');               // npm install express --save
const bodyParser = require('body-parser'); // parsea petiones http      npm i -S body-parser
// npm i -D nodemon  ->updateServer
const app = express();
const ProductCtrl = require('./controllers/product');

app.use(express.urlencoded({extended: false})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json

app.get('/api/product', ProductCtrl.getProducts );

//obtener productId
// GET http://localhost:3001/api/product/615a59cdbd5e4153215155ef
app.get('/api/product/:productId', ProductCtrl.getProduct);

//colocar algo
//POST http://localhost:3001/api/product
app.post('/api/product', ProductCtrl.saveProduct );


//actualizar productId
app.put('/api/product/:productId', ProductCtrl.updateProduct );

//borrar el productId req y res es de express
app.delete('/api/product/:productId', ProductCtrl.deleteProduct );

module.exports = app;