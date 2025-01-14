/*

    Ruta /api/notac

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT, validarAdmin_rol } = require('../middlewares/validar-jwt');

const { getNotaCredito, getNotaCreditoLimit, getnotacid, getNotaCreditoVenta, postNotaCredito, putNotaCredito, deleteNotaC, filterFechaNotaC } = require('../controllers/notaCredito-controller')

const router = Router();

router.get( '/' , validarJWT, validarAdmin_rol, getNotaCredito );

router.get( '/v', validarJWT, getNotaCreditoVenta )

router.get( '/limit' , validarJWT, getNotaCreditoLimit );

router.get( '/fecha' , validarJWT, validarAdmin_rol, filterFechaNotaC );

router.get( '/:id' , validarJWT, getnotacid );

router.post( '/', 
    [
        validarJWT,
        check('orden', 'El orden es obligatorio').not().isEmpty(),
        check('cliente', 'El cliente es obligatorio').isMongoId(),
        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('venta', 'La venta es obligatorio').isMongoId(),
        check('fecha_emision', 'La fecha de creacion es obligatorio').not().isEmpty(),
        check('totalD', 'El totald es obligatorio').not().isEmpty(),
        check('totalP', 'El totalp es obligatorio').not().isEmpty(),
        check('saldo', 'El saldo es obligatorio').not().isEmpty(),
        check('abono', 'El abono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postNotaCredito );


router.put( '/:id', 
    [
        validarJWT,
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       
        validarCampos
    ],
    putNotaCredito 
)

router.delete( '/:id', validarJWT, deleteNotaC)


module.exports = router;