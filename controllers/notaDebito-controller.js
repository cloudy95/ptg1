/*

    CONTROLADORES

*/

const { response } = require('express')
 
const NotaDebito = require( '../models/notaDebito' );

const Cliente = require('../models/clientes');
const Usuario = require('../models/usuario');
const Venta = require('../models/ventas')

/*=============================================
TRAER LA NOTA DE DEBITO CORRESPONTIENTE AL CLIENTE
=============================================*/
const getNotaDebito =  async( req, res = response )=>{

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

            const notaDebito = await NotaDebito.find({ cliente: filtroVendedor })
                                                .populate('usuario', 'nombre' )
                                                .populate('cliente', 'nombre' )
                                                .populate('venta' )


            res.status(200).json({
                ok:true,
                notaDebito
            })

        }else{

            const notaDebito = await NotaDebito.find()
                                            .populate('usuario', 'nombre' )
                                            .populate('cliente', 'nombre' )
                                            .populate('venta' )

            res.status(200).json({
                ok:true,
                notaDebito
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
OBTENER EL ULTIMO REGISTRO DE NOTA DE DEBITO
=============================================*/
const getNotaDebitoLimit = async (req, res = response)=>{

    try{

        //TRAER el ultimo dato registrado
        const notad = await NotaDebito.find().sort({$natural:-1}).limit(1);

        res.status(200).json({
            ok:true,
            notad
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
const postNotaDebito = async ( req, res = response )=>{

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

        const notad = new NotaDebito( req.body )

        //Guardar el usuario
        await notad.save();

        res.status(200).json({
            ok: true,
            notad
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
const putNotaDebito = async ( req, res = response )=>{

    try{


    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })

    }

}




module.exports = {

    getNotaDebito,
    getNotaDebitoLimit,
    postNotaDebito,
    putNotaDebito


}