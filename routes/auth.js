/*

    Ruta /api/login

*/

const { Router } = require('express')

const { login, renewToken } = require('../controllers/auth-contoller')
const { check } = require('express-validator')

const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require( '../middlewares/validar-campos' )

const router = Router();

router.post( '/', 
    [
        check('email', "El email es obligatorio").isEmail(),
        check('password', 'El password es obligarotio').not().isEmpty(),
        validarCampos 
    ],
    login
)



router.get( '/renew', validarJWT, renewToken)


module.exports = router