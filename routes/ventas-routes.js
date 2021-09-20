/*

    Ruta /api/venta

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { getVenta, getVentaLimit, postVenta, putVenta, filterFecha } = require( '../controllers/ventas-controller' );
const { validarJWT, validarAdmin_rol } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT , getVenta );

router.get( '/fecha' , validarJWT, filterFecha );

router.get( '/limit' , validarJWT, getVentaLimit );

router.post( '/', 
    [
        validarJWT,
        check('orden', 'El orden es obligatorio').not().isEmpty(),
        check('cliente', 'El cliente es obligatorio').isMongoId(),
        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('fecha_emision', 'La fecha es obligatorio').not().isEmpty(),
        check('precio_litro', 'El precio por litro obligatorio').not().isEmpty(),
        check('venta', 'La venta es obligatorio').not().isEmpty(),
        check('total_combustible', 'El total del combustible es obligatorio').not().isEmpty(),
        check('precioD', 'El precio en dolar es obligatorio').not().isEmpty(),
        check('precioP', 'El precio en pesos es obligatorio').not().isEmpty(),
        check('fecha_despacho', 'La fecha de despacho es obligatorio').not().isEmpty(),
        check('hora_despacho', 'La hora de despacho es obligatorio').not().isEmpty(),
        check('nombre_chofer', 'El nombre del chofer es obligatorio').not().isEmpty(),
        check('signo', 'El signo es obligatorio').not().isEmpty(),
        check('identificacion', 'La identificacion es obligatorio').not().isEmpty(),
        check('placa_chuto', 'La placa del chuto es obligatorio').not().isEmpty(),
        check('placa_cisterna', 'La placa del cisterna es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        validarCampos
    ],
    postVenta );

router.put( '/:id', 
    [
        validarJWT,
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    putVenta 
)


module.exports = router;