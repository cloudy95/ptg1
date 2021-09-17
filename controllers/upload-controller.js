const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require("../helpers/actualizar-image");


const fileUpload = ( req, res = response )=>{

    try{

        const { tipo, id } = req.params

        if( tipo != 'usuarios' ){

            return res.status(400).json({
                ok: false,
                msg: 'No es la tabla'
            })
        }

        // Validar que existe un archivo
        if (!req.files || Object.keys(req.files).length === 0) {

            return res.status(400).json({
                ok:false,
                msg: 'No hay ningun archivo'
            });

        }

        // Procesar la imagen...
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.')
        const extensionArchivo = nombreCortado[ nombreCortado.length-1 ];

        //Validar extension
        const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];

        if( !extensionesValida.includes(extensionArchivo) ){

            return res.status(400).json({
                ok:false,
                msg: 'No es una extension permitida'
            });

        }

        // Generar el nombre del archivo
        const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`

        // Path para guardar la imagen
        const path = `./uploads/usuarios/${ nombreArchivo }`;

        // Mover la imagen
        file.mv( path, (err)=>{

            if (err){

                console.log( err )

              return res.status(500).json({
                  ok:false,
                  msg: 'Error al mover la imagen'
              });

            }

            //Actualizar base de datos
            actualizarImagen( tipo, id, nombreArchivo, req.uid );

            res.json({

                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
    
            })

        });
        
        // console.log( file )
        // console.log( extensionArchivo )

       

    }catch( err ){

        console.log( err )

    }

}

const retornaImg = (req, res = response )=>{

    const { tipo, foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` );

    // Imagen por defecto
    if( fs.existsSync( pathImg ) ){

        res.sendFile( pathImg );

    }else{

        const pathImg = path.join( __dirname, `../uploads/no-image.png` );

        res.sendFile( pathImg );
    }


}

module.exports = {

    fileUpload,
    retornaImg
}