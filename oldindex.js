'use strict'   //para unas nuevas funciones de node 6 , let const

// para usar import debo usar babel, si no solo require

const express = require('express');  // importa express                 npm install express --save
const bodyParser = require('body-parser'); // parsea petiones http      npm i -S body-parser
//actualiza el server cuando hay cambios y no manualnpm i -D nodemon    devDependencies   en script se coloca esto  "start": "nodemon index.js", 

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json

//http://localhost:3001/hola      -> response {"message":"Hola mundo!"}  devolvio un json
//los parametros se dan con :  localhost/hola:name
//http://localhost:3001/hola/carlos    ->>        {"message":"Hola carlos!"}

//app.get('/hola',(req, res) =>{

app.get('/hola/:name',(req, res) =>{
    res.send({message: `Hola ${req.params.name}!`});
    //res.end; // no envio nada
});  // uso el metodo get cuando escriba localhost/hola. devuelve dos variables req ( request) y resp ( respuesta)


app.get('/hola',(req, res) =>{
    // res.send({message: `Hola ${req.params.name}!`});
    res.send('lalal');
     //res.end; // no envio nada
 });  // uso el metodo get cuando escriba localhost/hola. devuelve dos variables req ( request) y resp ( respuesta)
 
//https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto
//app restful  debe tener get/post/put/delete  CRUD= Create, Read, Update and Delete
//get pido datos al servidor, desde la url o barradenavegación get url y el server responde
//post enviamos datos al server, funciona parecido pero los datos viajan en el cuerpo y no en la cabecera o url
//delete petición desde el cliente para indicarle al server que va aborrar un archivo o recurso
//put  es para hacerle un update a alo un nombre o precio 

//los codigos de rspuestas son 1xx 2xx 200 OK  3xx ( redirección de una url a otra) 4xx 44 no existe recurso en el server 5xx errores internos

// el body de la petición y unas header, 
app.listen(port, () => {
    console.log(`API rest corriendo en http://localhost:${port}`);
} )
