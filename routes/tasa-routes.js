/*

    Ruta /api/tasa

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { validarJWT, validarAdmin_rol } = require('../middlewares/validar-jwt');

const {  getTasa, postTasa, putTasa} = require('../controllers/tasa-controller')

const router = Router();

router.get( '/' , validarJWT, getTasa );

router.post( '/', 
    [
        validarJWT,
        validarAdmin_rol,
        check('tasa', 'La tasa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    postTasa );

router.put( '/:id', 
    [
        validarJWT,
        validarAdmin_rol,
        check('tasa', 'La tasa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    putTasa)


module.exports = router;
