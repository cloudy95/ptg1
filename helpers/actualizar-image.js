const fs = require('fs');

const Usuario = require('../models/usuario');

const actualizarImagen = async( tipo, id, nombreArchivo )=>{

    let pathViejo = '';

    switch( tipo ){

        case 'usuarios':

            const usuario = await Usuario.findById( id )

            if( !usuario ){

                return false;

            }

            pathViejo = `./uploads/usuarios/${usuario.picture}`;

            if( fs.existsSync( pathViejo ) ){
                // Borrar la imagen anterior
                fs.unlinkSync( pathViejo )
            }

            // console.log( nombreArchivo )

            usuario.picture = nombreArchivo;
            await Usuario.findByIdAndUpdate( id, usuario, { new : true } )
            // await usuario.save();

            return true; 

        break;

    }

}

module.exports = {
    actualizarImagen
}

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));