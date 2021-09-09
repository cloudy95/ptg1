/*

    Ruta /api/fletep

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT } = require('../middlewares/validar-jwt');

const {  getFletep, postFletep, putFletep, getFletepid } = require('../controllers/flete-p-controller')

const router = Router();

router.get( '/' , validarJWT, getFletep );

router.get( '/:id' , validarJWT, getFletepid );

router.post( '/', 
    [
        validarJWT,
        check('nombrechofer', 'La orden es obligatorio').not().isEmpty(),
        check('fecha_despacho', 'El cliente el obligatorio' ).not().isEmpty(),
        check('placa_chuto', 'La observacion es obligatoria').not().isEmpty(),
        check('placa_sisterna', 'La observacion es obligatoria').not().isEmpty(),
        check('identificacion_chofer', 'La observacion es obligatoria').not().isEmpty(),
        check('cantidad_combustible', 'La observacion es obligatoria').not().isEmpty(),
        check('orden_compra', 'La observacion es obligatoria').not().isEmpty(),
        check('n_factura', 'La observacion es obligatoria').not().isEmpty(),
        check('n_control', 'La observacion es obligatoria').not().isEmpty(),
        check('fecha_emision', 'La observacion es obligatoria').not().isEmpty(),
        check('proveedor', 'La observacion es obligatoria').isMongoId(),
        validarCampos
    ],
    postFletep );

router.put( '/:id', 
    [
        validarJWT,
        check('nombrechofer', 'La orden es obligatorio').not().isEmpty(),
        check('fecha_despacho', 'El cliente el obligatorio' ).not().isEmpty(),
        check('placa_chuto', 'La observacion es obligatoria').not().isEmpty(),
        check('placa_sisterna', 'La observacion es obligatoria').not().isEmpty(),
        check('identificacion_chofer', 'La observacion es obligatoria').not().isEmpty(),
        check('cantidad_combustible', 'La observacion es obligatoria').not().isEmpty(),
        check('orden_compra', 'La observacion es obligatoria').not().isEmpty(),
        check('n_factura', 'La observacion es obligatoria').not().isEmpty(),
        check('n_control', 'La observacion es obligatoria').not().isEmpty(),
        check('fecha_emision', 'La observacion es obligatoria').not().isEmpty(),
        check('proveedor', 'La observacion es obligatoria').isMongoId(),
        validarCampos
    ],
    putFletep)


module.exports = router;
