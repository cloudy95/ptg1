/*

    Ruta /api/rubro

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT } = require('../middlewares/validar-jwt');

const { getRubro, crearRubro,  actualizarRubro,  borrarRubro, getRubroid } = require('../controllers/rubro-controller')

const router = Router();

router.get( '/' , validarJWT, getRubro );

router.get( '/:id' , validarJWT, getRubroid );

router.post( '/', 
    [
        validarJWT,
        check( 'nombre', "El nombre del rubro es obligarotio" ).not().isEmpty(),
        validarCampos
    ],
    crearRubro );

router.put( '/:id', 
    [
        validarJWT,
        check( 'nombre', "El nombre del rubro es obligarotio" ).not().isEmpty(),
        validarCampos
    ],
    actualizarRubro 
)

router.delete( '/:id',validarJWT, borrarRubro)


module.exports = router;