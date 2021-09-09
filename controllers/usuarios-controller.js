/*

    CONTROLADORES

*/

const { response } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

/*=============================================
	OBTEBER TODOS LOS USUARIOS
=============================================*/
const getUsuarios =  async(req, res)=>{

    try{

        const usuarios = await Usuario.find();

        res.json({
            ok: true,
            usuarios
            // uid: req.uid
        })

    }catch(err){

        res.status(500).json({
            ok: false,
            msg:'Error inesperado...'
        })

    }

}

/*=============================================
	OBTEBER TODOS LOS USUARIOS
=============================================*/
const getUsuariosid =  async(req, res)=>{

    const uid = req.params.id;

    try{

        const usuario = await Usuario.findById( uid )

        if ( !usuario  ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })

        }

        res.json({
            ok: true,
            usuario
            // uid: req.uid
        })

    }catch(err){

        res.status(500).json({
            ok: false,
            msg:'Error inesperado...'
        })

    }

}

/*=============================================
	CREAR USUARIOS
=============================================*/
const crearUsuarios =  async(req, res = response )=>{

    const { email, nombre, password, identificacion } = req.body

    try{

        // console.log( email )

        const existeEmail = await Usuario.findOne({ email })
        const existeIdentificacion = await Usuario.findOne({ identificacion })

        if( existeEmail || existeIdentificacion){

            return res.status(400).json({

                ok:false,
                msg: 'El correo o el identicador esta registrado'
            })

        }

        const usuario = new Usuario( req.body )

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt )

        //Guardar el usuario
        await usuario.save();

        const token = await generarJWT( usuario.id )

        res.json({
            ok: true,
            usuario,
            token
        })

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado... revisar logs'
        })

    }

    
}

/*=============================================
	ACTUALIZAR USUARIOS
=============================================*/
const actualizarUsuario = async (req, res = response) =>{

    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById( uid )

        if ( !usuarioDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })

        }
        
        //Actualizaciones 
        const { email, password, identificacion, ...campos } = req.body;

        if( usuarioDB.email != email ){

            const eisteEmail = await Usuario.findOne({ email: email })

            if( eisteEmail ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        if( usuarioDB.identificacion != identificacion ){

            const eisteEmail1 = await Usuario.findOne({ identificacion: identificacion })

            if( eisteEmail1 ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe un usuario con esta identificacion'
                })
            }
        }

        campos.email = email;
        campos.identificacion = identificacion;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new : true } )

        res.json({
            ok: true,
            usuario: usuarioActualizado    
        })


    }catch(error){

        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }

}

/*=============================================
	ACTUALIZAR PASSWORD
=============================================*/
const actualizarPw = async ( req, res = response )=>{

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById( uid )

        if ( !usuarioDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })

        }

        const { password, ...campos } = req.body;

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        campos.password = bcrypt.hashSync( password, salt )

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new : true } )

        const token = await generarJWT( uid )

        res.json({
            ok: true,
            msg:'Cambio exitoso',
            token
        })

    }catch( err ){

        console.log( err )
        res.status( 500 ).json({

            ok:false,
            msg: 'Error inesperado'

        })

    }

}

/*=============================================
	BORRAR USUARIOS
=============================================*/
const borrarUsuario = async( req, res = response )=>{

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById( uid )

        if ( !usuarioDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })

        }

        await Usuario.findByIdAndDelete( uid )

        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        })


    }catch( err ){


        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


module.exports = {

    getUsuarios,
    getUsuariosid,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
    actualizarPw

}