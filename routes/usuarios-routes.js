/*

    Ruta /api/usuarios

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require( '../middlewares/validar-campos' )

const { getUsuarios, getUsuariosid,  crearUsuarios, actualizarUsuario, borrarUsuario, actualizarPw } = require( '../controllers/usuarios-controller' );
const { validarJWT, validarAdmin_rol } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', [ validarJWT ,validarAdmin_rol ] , getUsuarios );

router.get( '/:id', [ validarJWT ,validarAdmin_rol ] , getUsuariosid );

router.post( '/', 
    [
        validarJWT,
        validarAdmin_rol,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('identificacion', 'El identificacion es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('direccion', 'El direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearUsuarios );

router.put( '/:id', 
    [
        validarJWT,
        validarAdmin_rol,
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario 
)

router.put( '/p/:id', 
    [
        validarJWT,
        validarAdmin_rol,
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarPw 
)

router.delete( '/:id', [ validarJWT ,validarAdmin_rol ], borrarUsuario)


module.exports = router;