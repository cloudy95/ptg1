const { response } = require('express')

const Venta = require('../models/ventas')
const Usuario = require('../models/usuario');
const Cliente = require('../models/clientes')

/*=============================================
	OBTEBER TODAS LAS VENTAS
=============================================*/
const getVenta = async ( req, res = response  )=>{

    try{

        const venta = await Venta.find();

        res.json({
            ok: true,
            venta
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
OBTENER EL ULTIMO REGISTRO DEL FLETE PRIMARIO
=============================================*/
const getVentaLimit = async (req, res = response)=>{

    try{

        //TRAER el ultimo dato registrado
        const venta = await Venta.find().sort({$natural:-1}).limit(1);

        res.status(200).json({
            ok:true,
            venta
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
CREAR VENTA
=============================================*/
const postVenta =  async(req, res = response )=>{

    try{

        const { cliente, usuario } = req.body

        const [ clientes, usuarios ] = await Promise.all([
            Cliente.findById( cliente ),
            Usuario.findById( usuario )
        ]) 

        if( !clientes || !usuarios ){

            return res.status(404).json({
                ok: false,
                msg: 'No existe estos campos'
            })

        }
        

        const venta = new Venta( req.body )

        //Guardar el usuario
        await venta.save();

        res.json({
            ok: true,
            venta
        })

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado.'
        })

    }

}

/*=============================================
ACTUALIZAR VENTA
=============================================*/
const putVenta = async ( req, res = response )=>{


}

/*=============================================
FILTRADO POR RANGO DE FECHAS DE REGISTROS DE VENTAS
=============================================*/
const filterFecha = async( req, res = response )=>{

    try{

        if( new Date(req.query.fecha_inicial) != 'Invalid Date' || new Date(req.query.fecha_final) != 'Invalid Date' ){

            //Guardando el rango de fechas
            const fechaInicial = req.query.fecha_inicial;
            const fechaFinal = req.query.fecha_final;
    
            const reg = await Venta.find({
                fecha_emision: {
                    $gte:fechaInicial,
                    $lt:fechaFinal
                }
            })
            .populate('usuario', 'nombre identificacion signo')
            .populate('cliente', 'nombre signo identificacion')

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

    getVenta,
    getVentaLimit,
    postVenta,
    putVenta,
    filterFecha
}