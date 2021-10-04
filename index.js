
'use strict'   //para unas nuevas funciones de node 6 , let const
// funcionaidad conexión a base de datos


const mongoose = require('mongoose');   // npm i -S mongoose  librería para conectarse mas facil mas alto nivel con la BD
const app = require('./app')
const config = require('./config')
const port = process.env.PORT || 3001;


//BD  mongo esta corriendo por defecto con el systemd no hay que iniciarlo
mongoose.connect(config.db, (err , res) =>{
   // if( err) throw err  // lanza una excepción con error
   if( err){
       return console.log(`Error al conectar a la BD: ${err}`);
   }
   console.log('Conexion a la BD establecida...')

    app.listen(config.port, () => {
        console.log(`API rest corriendo en http://localhost:${config.port}`);
    } )

})
