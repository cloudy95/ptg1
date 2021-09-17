/*

    Ruta /api/proveedores

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT } = require('../middlewares/validar-jwt');

const { getProveedores, crearProveedores, actualizarProveedores, borrarProveedores, getProveedoresid } = require('../controllers/proveedores-controller')

const router = Router();

router.get( '/' , validarJWT,  getProveedores );

router.get( '/:id' , validarJWT,  getProveedoresid );

router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('identificacion', 'La identificacion es obligarotia').not().isEmpty(),
        check('signo', 'El signo es obligarotia').not().isEmpty(),
        check( 'direccion', 'La direccion el obligatoria' ).not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('compania', 'El rubro es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearProveedores );

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('identificacion', 'La identificacion es obligarotia').not().isEmpty(),
        check( 'direccion', 'La direccion el obligatoria' ).not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('compania', 'El rubro es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarProveedores 
)

router.delete( '/:id', validarJWT, borrarProveedores)


module.exports = router;