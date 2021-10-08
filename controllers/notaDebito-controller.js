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

        if( filtrocliente.length > 2 ){

            const clienteDB = await Cliente.findById( filtrocliente );

            if( !clienteDB ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'No existe el cliente'
                })

            }

            const notaDebito = await NotaDebito.find({ cliente: filtrocliente })
                                                .populate('usuario', 'nombre apellido' )
                                                .populate('cliente', 'nombre signo identificacion telefono' )
                                                .populate('venta' )


            res.status(200).json({
                ok:true,
                notaDebito
            })

        }else if( filtrocliente == '0' ){
        
            /*=============================================
            TRAER SOLO LOS SALDOS MAYORES A 0
            =============================================*/
            const notaDebito = await NotaDebito.find( {saldo:{$gt:0}} )
                                                .populate('usuario', 'nombre apellido' )
                                                .populate('cliente', 'nombre signo identificacion telefono' )
                                                .populate('venta' )

            res.status(200).json({
                ok:true,
                notaDebito
            })

        
        }else{

            const notaDebito = await NotaDebito.find()
                                            .populate('usuario', 'nombre apellido' )
                                            .populate('cliente', 'nombre signo identificacion telefono' )
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
TRAIGO LA NOTA DE DEBITO POR SU VENTA
=============================================*/

const getNotaDebitoVenta =  async( req, res = response )=>{

    try{

        const filtroventa = req.query.venta;

        if( filtroventa.length != ''){

            const ventaDB = await Venta.findById( filtroventa );

            if( !ventaDB ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'No existe'
                })

            }

            const notaDebito = await NotaDebito.find({ venta: filtroventa })


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
TRAER LA NOTA DE DEBITO POR EL ID DE LA VENTA
=============================================*/
const getnotadid = async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const venta = await Venta.findById( uid )

        if( !venta ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        const notadebitoDB = await NotaDebito.find( { venta: uid } )
                                    // .populate('cliente', 'signo identificacion')

        
        res.status(200).json({

            ok:true,
            notadebitoDB

        })

    }catch(err){

        res.status(500).json({
            ok:false,
            msg:'Error inesperado...'
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

        const uid = req.params.id;

        const notacDB = await NotaDebito.findById( uid )

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

        const editnotad = await NotaDebito.findByIdAndUpdate( uid, req.body, { new : true } )

        res.status(200).json({
            ok:true,
            editnotad
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
const deleteNotaD = async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const notacDB = await NotaDebito.findById( uid )

        if( !notacDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        await NotaDebito.findByIdAndDelete( uid )

        res.status(200).json({
            ok:true,
            msg:'Nota debito eliminada'
        }) 


    }catch(err){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        })


    }

}

/*=============================================
FILTRADO POR RANGO DE FECHAS DE NOTA DE DEBITO
=============================================*/
const filterFechaNotaD = async( req, res = response )=>{

    try{

        // console.log( req.query.fecha_inicial )

        if( new Date(req.query.fecha_inicial) != 'Invalid Date' || new Date(req.query.fecha_final) != 'Invalid Date' ){

            //Guardando el rango de fechas
            const fechaInicial = req.query.fecha_inicial;
            const fechaFinal = req.query.fecha_final;
    
            const reg = await NotaDebito.find({
                fecha_emision: {
                    $gte:fechaInicial,
                    $lt:fechaFinal
                }
            })
            .populate('usuario', 'nombre apellido signo identificacion' )
            .populate('cliente', 'nombre identificacion' )
            .populate('venta' )

            res.status(200).json({
                ok:true,
                reg
            })


        }else{

            res.status(500).json({
    
                ok:false,
                msg:'Error inesperado'
            })


        }

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado... revisar logs'
        })

    }

}

module.exports = {

    getNotaDebito,
    getNotaDebitoLimit,
    getnotadid,
    getNotaDebitoVenta,
    postNotaDebito,
    putNotaDebito,
    deleteNotaD,
    filterFechaNotaD

}