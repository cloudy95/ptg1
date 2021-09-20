/*

    CONTROLADORES

*/

const { response } = require('express')

const Fiscalizacion = require('../models/fiscalizacion')
const Usuario = require('../models/usuario');
const Clientes = require('../models/clientes');

/*=============================================
	TRAER TODAS LAS FISCALIZACIONES
=============================================*/
const getFiscalizacion = async (req, res = response)=>{

    const filtroVendedor = req.query.vend || '';

    try{

        let fiscalizacion = '';

        if( filtroVendedor != '' ){

            const clienteDB = await Clientes.findById( filtroVendedor );

            if( !clienteDB ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'No existe el cliente'
                })

            }

            fiscalizacion = await Fiscalizacion.find({ cliente: filtroVendedor })
                                                .populate('usuario', 'nombre' )
                                                .populate('cliente', 'nombre' )
                                               

        }else{

            fiscalizacion = await Fiscalizacion.find();

        }


        res.status(200).json({
            ok:true,
            fiscalizacion
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
	OBTENER EL ULTIMO REGISTRO DE FISCALIZACION
=============================================*/
const getFiscalizacionLimit = async (req, res = response)=>{

    try{

        //TRAER el ultimo dato registrado
        const fiscalizacion = await Fiscalizacion.find().sort({$natural:-1}).limit(1);

        res.status(200).json({
            ok:true,
            fiscalizacion
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
	Crear FISCALIZACION
=============================================*/
const crearFiscalizacion = async( req, res =response  )=>{
    
    try{

        const usuarioDB = await Usuario.findById( req.body.usuario );

        if( !usuarioDB ){

            return res.status( 400 ).json({
                ok: false,
                msg: 'No existe el usuario'
            })

        }

        const clienteDB = await Clientes.findById( req.body.cliente );

        if( !clienteDB ){

            return res.status( 400 ).json({
                ok: false,
                msg: 'No existe el cliente'
            }) 
        }

        const uid = req.uid
        const fiscalizacion = new Fiscalizacion({
            usuario: uid,
            ...req.body});

        const fiscalizacionDB = await fiscalizacion.save()

        res.status(200).json({
            ok:true,
            fiscalizacion: fiscalizacionDB
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
	ACTUALIZAR FISCALIZACION
=============================================*/
const ActualizarFiscalizacion = async( req, res = response )=>{

    const uid = req.params.id

    try{

        const fiscalizacionDB = await Fiscalizacion.findById( uid )

        if( !fiscalizacionDB ){

            return res.status(404).json({
                ok: false,
                msg: 'No existe la fiscalizacion que deseas actualizar'
            })

        }

        // const usuarioDB = await Usuario.findById( req.body.usuario );

        // if( !usuarioDB ){

        //     return res.status( 400 ).json({
        //         ok: false,
        //         msg: 'No existe el usuario'
        //     })

        // }

        // const clienteDB = await Clientes.findById( req.body.cliente );

        // if( !clienteDB ){

        //     return res.status( 400 ).json({
        //         ok: false,
        //         msg: 'No existe el cliente'
        //     }) 
        // }


        const fiscalizacionActualizada = await Fiscalizacion.findByIdAndUpdate( uid, req.body, { new : true } )

        res.status(200).json({
            ok:true,
            fiscalizacionActualizada
        })

    }catch(err){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado... revisar logs'
        })
    }
    
}

/*=============================================
	BORRAR FISCALIZACION
=============================================*/
const borrarFiscalizacion = async (req, res = response)=>{  

    try{ 

        const uid = req.params.id

        const fiscalizacionDB = await Fiscalizacion.findById( uid )

        if( !fiscalizacionDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe la fiscalizacion que deseas eliminar'
            })

        }

        await Fiscalizacion.findByIdAndDelete( uid )

        res.status(200).json({
            ok:true,
            msg:'Fiscalizacion borrada'
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
	EXPORTAR METODOS
=============================================*/
module.exports = {

    getFiscalizacion,
    crearFiscalizacion,
    borrarFiscalizacion,
    getFiscalizacionLimit,
    ActualizarFiscalizacion

}