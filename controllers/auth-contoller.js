const bcrypt = require('bcryptjs')

const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');


const { getMenuFrontend } = require('../helpers/menu-frontend')

const Usuario = require('../models/usuario');

const login = async( req, res = response )=>{

    const { email, password } = req.body;

    try{

        //verificar email
        const usuarioDB = await Usuario.findOne({ email: email.toLowerCase() })

        if( !usuarioDB ){

            return res.status(400).json({

                ok: false,
                msg: 'Datos incorrectos'

            }) 
        }

        //Verificar que el usuario este activo
        if( !usuarioDB.estado ){

            return res.status(400).json({

                ok: false,
                msg: 'Cuenta deshabilitada'

            }) 
            
        }

        //verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password )

        if( !validPassword ){

            return res.status(400).json({
                ok: false,
                msg: 'Datos incorrectos'
            })

        }

        
        // Generar el TOKEN JWT
        const token = await generarJWT( usuarioDB.id )

        res.json({
            ok:true,
            token,
            menu: getMenuFrontend( usuarioDB.rol )
        })

    }catch( err ){

        throw res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    if( !usuario ){

        return res.status(400).json({
            ok: false,
            msg: 'No existe'
        })
    }

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontend( usuario.rol )
    });

}

module.exports = {

    login,
    renewToken

}