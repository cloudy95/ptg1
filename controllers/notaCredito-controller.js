/*

    CONTROLADORES

*/

const { response } = require('express')
 
const NotaCredito = require( '../models/notaCredito' );

const Cliente = require('../models/clientes');
const Usuario = require('../models/usuario');
const Venta = require('../models/ventas')

/*=============================================
TRAER LA NOTA DE DEBITO CORRESPONTIENTE AL CLIENTE
=============================================*/
const getNotaCredito = async ( req, res = response )=>{

    try{

        const filtrocliente = req.query.cliente || '';

        if( filtrocliente != '' ){

            const clienteDB = await Cliente.findById( filtrocliente );

            if( !clienteDB ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'No existe el cliente'
                })

            }

            const notaCredito = await NotaCredito.find({ cliente: filtrocliente })
                                                .populate('usuario', 'nombre signo identificacion' )
                                                .populate('cliente', 'nombre signo identificacion' )
                                                .populate('venta' )


            res.status(200).json({
                ok:true,
                notaCredito
            })

        }else{

            const notaCredito = await NotaCredito.find()
                                                .populate('usuario', 'nombre' )
                                                .populate('cliente', 'nombre' )
                                                .populate('venta' )

            res.status(200).json({
                ok:true,
                notaCredito
            })
        }

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })

    }

}

/*=============================================
	TRAER LA NOTA DE CREDITO POR SU ID
=============================================*/
const getnotacid = async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const venta = await Venta.findById( uid )

        if( !venta ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        const notaCreditoDB = await NotaCredito.find(  { venta :uid } )
                                    // .populate('cliente', 'signo identificacion')

        res.status(200).json({

            ok:true,
            notaCreditoDB

        })

    }catch(err){

        res.status(500).json({
            ok:false,
            msg:'Error inesperado...'
        })

    }

}

/*=============================================
OBTENER EL ULTIMO REGISTRO DE NOTA DE CREDITO
=============================================*/
const getNotaCreditoLimit = async (req, res = response)=>{

    try{

        //TRAER el ultimo dato registrado
        const notac = await NotaCredito.find().sort({$natural:-1}).limit(1);

        res.status(200).json({
            ok:true,
            notac
        })


    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })

    }

}

/*=============================================
CREAR LA NOTA DE DEBITO
=============================================*/
const postNotaCredito = async ( req, res = response )=>{

    try{

        const { cliente, usuario, venta } = req.body;

        const [ clientes, usuarios, ventas ] = await Promise.all([
            Cliente.findById(cliente),
            Usuario.findById( usuario ),
            Venta.findById( venta )
        ])

        if( !clientes || !usuarios || !ventas ){

            return res.status( 400 ).json({
                ok: false,
                msg: 'No existe cliente/usuario/venta'
            })

        }

        const notac = new NotaCredito( req.body )

        //Guardar el usuario
        await notac.save();

        res.status(200).json({
            ok: true,
            notac
        })

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })

    }

}


/*=============================================
ACTUALIZAR LA NOTA DE DEBITO
=============================================*/
const putNotaCredito =  async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const notacDB = await NotaCredito.findById( uid )

        if( !notacDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        // const { cliente, usuario, venta } = req.body;

        // const [ cliente1, usuario1, venta1 ] = await Promise.all([
        //     Cliente.findById( cliente ),    
        //     Usuario.findById( usuario ),
        //     Venta.findById( venta )
        // ])

        // if( !cliente1 || !usuario1 || venta1 ){

        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'No existe estos campos'
        //     })

        // }

        const editnotac = await NotaCredito.findByIdAndUpdate( uid, req.body, { new : true } )

        res.status(200).json({
            ok:true,
            editnotac
        })
 
    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })

    }

}

/*=============================================
ELIMINAR LA NOTA DE DEBITO
=============================================*/
const deleteNotaC = async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const notacDB = await NotaCredito.findById( uid )

        if( !notacDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        await NotaCredito.findByIdAndDelete( uid )

        res.status(200).json({
            ok:true,
            msg:'Nota credito eliminada'
        }) 


    }catch(err){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })


    }

}

module.exports = {

    getNotaCredito,
    getNotaCreditoLimit,
    getnotacid,
    postNotaCredito,
    putNotaCredito,
    deleteNotaC

}