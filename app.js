'use strict'

//funcionalidad de express - server

const express = require('express');               
const bodyParser = require('body-parser'); 
const app = express();
const api = require('./routes/index');

app.use(express.urlencoded({extended: false})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json
app.use('/api', api)  // use api,  http://localhost:3001/api/product  pero en routes ya no se coloca, /lala   http://localhost:3001/lala/product 


module.exports = app;