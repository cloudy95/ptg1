/*

    Ruta /api/usuarios

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT } = require('../middlewares/validar-jwt');

const { getClientes, crearClientes, actualizarClientes, borrarClientes, getClientespid } =  require( '../controllers/clientes-controller' ) 

const router = Router();

router.get( '/' , validarJWT, getClientes );

router.get( '/:id' , validarJWT, getClientespid );

router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
        // check('identificacion', 'La identificacion es obligarotia').not().isEmpty(),
        check('rubro', 'El rubro es obligatorio').isMongoId(),
        validarCampos
    ],
    crearClientes );
    
router.put( '/:id', 
    [
        validarJWT,
        // check('nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
        // check('identificacion', 'La identificacion es obligarotia').not().isEmpty(),
        // check( 'direccion', 'La direccion el obligatoria' ).not().isEmpty(),
        // check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        // check('rubro', 'El rubro es obligatorio').isMongoId(),
        // check('ciiv', 'El ciiv es obligatorio').not().isEmpty(),
        validarCampos 
    ],
    actualizarClientes 
)

router.delete( '/:id', validarJWT, borrarClientes)


module.exports = router;