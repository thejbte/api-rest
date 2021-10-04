'use strict'   //para unas nuevas funciones de node 6 , let const

// para usar import debo usar babel, si no solo require

const express = require('express');  // importa express                 npm install express --save
const bodyParser = require('body-parser'); // parsea petiones http      npm i -S body-parser
//actualiza el server cuando hay cambios y no manualnpm i -D nodemon    devDependencies   en script se coloca esto  "start": "nodemon index.js", 

const mongoose = require('mongoose');// npm i -S mongoose  librería para conectarse mas facil mas alto nivel con la BD

const Product = require('./models/product'); // llamo el modelo de la BD

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended: false})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json


app.get('/api/product',(req, res) =>{
  //res.send(200,{products:[] });  //envio un json y el OK
  Product.find( {} , (err, products) =>{
    if(err) return res.status(500).send( {message: `Error al realizar la petición: ${err}`});
    if(!products) return res.status(404).send({message: `NO existen existe`});
    res.status(200).send({products: products });
  })

});

//obtener productId
// GET http://localhost:3001/api/product/615a59cdbd5e4153215155ef
app.get('/api/product/:productId',(req, res) =>{  // productid es solo un nombre de  parametro input, quue al buscarlo en la BD puede coincidir o no
  let productId = req.params.productId;

  Product.findById(productId, (err, product) =>{  // product es lo que encuentra 
    if(err) return res.status(500).send( {message: `Error al realizar la petición: ${err}`});
    if(!product) return res.status(404).send({message: `El producto no existe`});

    res.status(200).send( { product: product }); // si el id que recibi se ecnuentra en Pdroduct entonces devuelvo lo mismo , un eco
  })

});

//colocar algo
//POST http://localhost:3001/api/product
/*
{
    "product": {
        "_id": "615a59cdbd5e4153215155ef",
        "name": "Accer",
        "picture": "accer.png",
        "price": 1300,
        "category": "computers",
        "description": "nitro 5 15 inch",
        "__v": 0
    }
}
 */
app.post('/api/product',(req, res) =>{
   
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

});


//actualizar productId
app.put('/api/product/:productId',(req, res) =>{
    let productId = req.params.productId;
    let update =req.body;

    Product.findByIdAndUpdate(productId ,update, (err, productUpdated) =>{

        if(err) res.status(500).send({ message: `Error al actualizar el producto: ${err}`});
        res.status(200).send({product: productUpdated});
    })

});

//borrar el productId
app.delete('/api/product/:productId',(req, res) =>{
    let productId = req.params.productId;

    Product.findById(productId , (err, product) =>{
        if(err) res.status(500).send({ message: `Error al borrar e producto: ${err}`})
        
        product.remove( err =>{  //borro el producto on ID que entro que est en product
            if(err) res.status(500).send({ message: `Error al borrar e producto: ${err}`})
            res.status(200).send({message: 'El producto ha sido eliminado'})
        })
    })

});

//BD  mongo esta corriendo por defecto con el systemd no hay que iniciarlo
mongoose.connect('mongodb://localhost:27017/shop', (err , res) =>{
   // if( err) throw err  // lanza una excepción con error
   if( err){
       return console.log(`Error al conectar a la BD: ${err}`);
   }
   console.log('Conexion a la BD establecida...')

    app.listen(port, () => {
        console.log(`API rest corriendo en http://localhost:${port}`);
    } )

})

/*
app.listen(port, () => {
    console.log(`API rest corriendo en http://localhost:${port}`);
} )
*/