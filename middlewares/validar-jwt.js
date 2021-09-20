const jwt = require( 'jsonwebtoken' )

const Usuario = require( '../models/usuario' );

const validarJWT = ( req, res, next )=>{

    //Leer el token
    const token = req.header( 'x-token' )
    
    if( !token ){

        return res.status( 401 ).json({
            ok:false,
            msg: 'No hay token en la peticion'
        })

    } 

    try{

        const { uid } = jwt.verify( token, process.env.JWT_SECRET  );
        req.uid = uid;

        next()

    }catch( err ){

        return res.status(400).json({
            ok:false,
            msg:'Token no valido'
        })
    }

}

const validarAdmin_rol = async( req, res, next )=>{

    const uid = req.uid;

    try{

        const usuarioDB = await Usuario.findById( uid )

        if( !usuarioDB ){
            return res.status( 404 ).json({
                ok:false,
                msg:'Usuario no existe'
            })

        }

        if( usuarioDB.rol !== 'administrador' ){

            return res.status( 403 ).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            })
        }


        if( usuarioDB.email !== 'ptg1@gmail.com' ){

            return res.status( 403 ).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            })
        }

        next();

    }catch( err ){

        console.log( err )

        throw res.status( 500 ).json({
            ok: false,
            msg: 'Error inesperado'

        })

    }

}

module.exports = {

    validarJWT,
    validarAdmin_rol

}