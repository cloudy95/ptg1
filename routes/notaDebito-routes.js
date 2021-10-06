/*

    Ruta /api/notad

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT } = require('../middlewares/validar-jwt');

const {  getNotaDebito, getNotaDebitoLimit, getnotadid, postNotaDebito, putNotaDebito, deleteNotaD, filterFechaNotaD } = require('../controllers/notaDebito-controller')

const router = Router();

router.get( '/' , validarJWT,  getNotaDebito );

router.get( '/limit' , validarJWT,  getNotaDebitoLimit );

router.get( '/fecha' , validarJWT, filterFechaNotaD );

router.get( '/:id' , validarJWT,  getnotadid );

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
    postNotaDebito );

router.put( '/:id', 
    [
        validarJWT,
        validarCampos
    ],
    putNotaDebito 
)

router.delete( '/:id', validarJWT, deleteNotaD)


module.exports = router;