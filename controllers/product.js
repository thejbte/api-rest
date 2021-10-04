'use strict'
const product = require('../models/product');
const Product = require('../models/product'); // llamo el modelo de la BD

function getProduct(req, res){
    let productId = req.params.productId;

    Product.findById(productId, (err, product) =>{  // product es lo que encuentra 
      if(err) return res.status(500).send( {message: `Error al realizar la petición: ${err}`});
      if(!product) return res.status(404).send({message: `El producto no existe`});
  
      res.status(200).send( { product: product }); // si el id que recibi se ecnuentra en Pdroduct entonces devuelvo lo mismo , un eco
    })
}

function getProducts(req, res){
     //res.send(200,{products:[] });  //envio un json y el OK
  Product.find( {} , (err, products) =>{
    if(err) return res.status(500).send( {message: `Error al realizar la petición: ${err}`});
    if(!products) return res.status(404).send({message: `NO existen existe`});
    res.status(200).send({products: products });
  }) 
}

//post
function saveProduct(req, res){
    console.log('POST /api/product');
    console.log(req.body);
  
    let product = new Product();  // nuevavariable de tipo modelo BD creado previamente en product.js
    product.name = req.body.name; // lo que llega lo almaceno, pero debe estar relacionado a lo que hay en la BD si el key no es name cuando lo mande no lo guarda
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category; //// lo que llega lo almaceno, pero debe estar relacionado a lo que hay en la BD si el key no esta en el enum de category no lo guarda
    product.description = req.body.description;
  
    //metodo
    product.save(( err , productStored) =>{
        // cuando se almacene mongo le asiga un ID unico con el que se puede acceder
        if(err){
            res.status(500).send({ message: `Èrror al guardar en la BD ${err}`}); //envio un json con el mensaje
        }
        res.status(200).send({product: productStored});
  
    }); //como mongoose puede acceder a los emtodos de mongoDB
  
}

function updateProduct(req, res){
    let productId = req.params.productId;
    let update =req.body;

    Product.findByIdAndUpdate(productId ,update, (err, productUpdated) =>{

        if(err) res.status(500).send({ message: `Error al actualizar el producto: ${err}`});
        res.status(200).send({product: productUpdated});
    })
}

function deleteProduct(req, res){
    let productId = req.params.productId;

    Product.findById(productId , (err, product) =>{
        if(err) res.status(500).send({ message: `Error al borrar e producto: ${err}`})
        
        product.remove( err =>{  //borro el producto on ID que entro que est en product
            if(err) res.status(500).send({ message: `Error al borrar e producto: ${err}`})
            res.status(200).send({message: 'El producto ha sido eliminado'})
        })
    })
}

//array de funciones para exportar
module.exports = {

     getProduct,
     getProducts,
     saveProduct,
     updateProduct,
     deleteProduct
}