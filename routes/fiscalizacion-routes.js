/*

    Ruta /api/fiscalizacion

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT } = require('../middlewares/validar-jwt');

const { getFiscalizacion, crearFiscalizacion,  borrarFiscalizacion, ActualizarFiscalizacion, getFiscalizacionLimit} =  require( '../controllers/fiscalizacion-controller' ) 

const router = Router();

router.get( '/' , validarJWT, getFiscalizacion );

router.get( '/limit' , validarJWT, getFiscalizacionLimit );

router.post( '/', 
    [
        validarJWT,
        check('orden', 'La orden es obligatorio').not().isEmpty(),
        check('cliente', 'El cliente el obligatorio' ).isMongoId(),
        check('observacion', 'La observacion es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearFiscalizacion );

router.put( '/:id', 
    [
        validarJWT,
        check('orden', 'La orden es obligatorio').not().isEmpty(),
        check('cliente', 'El cliente el obligatorio' ).isMongoId(),
        check('usuario', 'El usuario el obligatorio' ).isMongoId(),
        check('observacion', 'La observacion es obligatoria').not().isEmpty(),
        validarCampos
    ],
 ActualizarFiscalizacion)


module.exports = router;