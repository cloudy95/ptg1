require('dotenv').config();
const path = require('path')

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

//crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() )

//Lectura y parceo del body
app.use( express.json() )

//DASE DE DATOS
dbConnection();

// JDotj3N1JhCFJp2h

//Rutas
//el segundo argumento seria el controlador
app.use( '/api/usuarios', require('./routes/usuarios-routes') )
app.use( '/api/clientes', require('./routes/clientes-routes') )
app.use( '/api/proveedores', require('./routes/proveedores-routes') )
app.use( '/api/rubro', require('./routes/rubro-routes') )
app.use( '/api/fiscalizacion', require('./routes/fiscalizacion-routes') )
app.use( '/api/fletep', require('./routes/flete-p-routes') )
app.use( '/api/upload', require('./routes/upload') )
app.use( '/api/todo', require( './routes/busquedas' ) )
app.use( '/api/login', require( './routes/auth' ) )

//Lo ultimo
// app.get( '*', ( req, res )=>{

//     res.sendFile( path.resolve(__dirname, 'public/index.html') )

// })

//con esto se levanta el sistema
app.listen( process.env.PORT, () =>{

    console.log( 'Servidor corriendo en el puerto' + process.env.PORT  )
})