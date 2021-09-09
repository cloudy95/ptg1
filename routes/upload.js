/*

   ruta: api/upload

*/
 
const { Router } = require('express')
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImg } = require('../controllers/upload-controller');

const router = Router();

router.use( expressfileUpload() );

router.put( '/:tipo/:id' , validarJWT, fileUpload );

router.get( '/:tipo/:foto' , retornaImg );

module.exports = router;