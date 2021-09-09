/*

   ruta:api/todo/:busqueda

*/


const { Router } = require('express')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getBusqueda, getBusquedaColeccion } = require( '../controllers/busqueda-controller' )

const router = Router();

router.get( '/:busqueda' , validarJWT, getBusqueda );
router.get( '/coleccion/:tabla/:collection/:busqueda' , validarJWT, getBusquedaColeccion );


module.exports = router;