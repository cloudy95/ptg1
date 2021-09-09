const bcrypt = require('bcryptjs')

const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const login = async( req, res = response )=>{

    const { email, password } = req.body;

    try{

        //verificar email
        const usuarioDB = await Usuario.findOne({ email })

        if( !usuarioDB ){

            return res.status(400).json({

                ok: false,
                msg: 'Email'

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
                msg: 'Errorp'
            })

        }

        
        // Generar el TOKEN JWT
        const token = await generarJWT( usuarioDB.id )

        res.json({
            ok:true,
            token
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


    res.json({
        ok: true,
        token,
        usuario
    });

}

module.exports = {

    login,
    renewToken

}