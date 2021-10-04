'use strict'
//productos para la base de datos ejemplo de ecoomerce

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creamos un modelo , asi mogoose es noSQL pero es mejor para organizar los datos
const productSchema = Schema({
    name: String,
    picture: String,
    price: Number,
    category: {type: String, enum: ['computers', 'phones','accesories']},
    description: String
});

module.exports = mongoose.model('Product',productSchema);
