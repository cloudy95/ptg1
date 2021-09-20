const { response } = require('express');

const Fleteprimario = require('../models/flete-p');
const Proveedor = require('../models/proveedores')

/*=============================================
	TRAER TODAS LAS FLETE PRIMARIO
=============================================*/
const getFletep = async( req, res = response  )=>{

    try{

        const fletep = await Fleteprimario.find()
                                        .populate('usuario', 'nombre identificacion')
                                        .populate('proveedor', 'nombre')

        res.status(200).json({

            ok:true,
            fletep

        })
        
    }catch(err){

        console.log(err);
        throw res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

/*=============================================
	TRAER FLETE PRIMARIO POR SU ID
=============================================*/
const getFletepid = async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const feltepDB = await Fleteprimario.findById( uid )
                                            .populate('usuario', 'nombre identificacion')

        if( !feltepDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe, Flete primario'
            })
        }

        res.status(200).json({

            ok:true,
            feltepDB

        })

    }catch(err){

        res.status(500).json({
            ok:false,
            msg:'Error inesperado...'
        })

    }

}


/*=============================================
	CREATE FLETE PRIMARIO
=============================================*/
const postFletep = async ( req, res = response  )=>{

    try{

        const { n_factura, n_control, proveedor } = req.body

        const existeFactura = await Fleteprimario.findOne({ n_factura })
        const existeControl = await Fleteprimario.findOne({ n_control })

        // console.log( existeFactura )

        if( existeFactura || existeControl){

            return res.status(400).json({

                ok:false,
                msg: 'La factura o el n control ya existen'
            })

        }

        const provedores = await Proveedor.findById( proveedor )

        if( !provedores ){

            return res.status(404).json({
                ok: false,
                msg: 'No existe este proveedor'
            })

        }

        const uid = req.uid;
        const fletep = new Fleteprimario({
            usuario: uid,
            ...req.body
        })

        //Se guarda
        const feltepDB = await fletep.save();

        res.status(200).json({
            ok:true,
            feltepDB
        })


    }catch(err){

        console.log(err);
        throw res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

/*=============================================
	PUT FLETE PRIMARIO
=============================================*/
const putFletep = async ( req, res = response  )=>{

    const uid = req.params.id;

    try{

        const feltepDB = await Fleteprimario.findById( uid )

        if( !feltepDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe, Flete primario'
            })
        }

        //VERIFICAR QUE EXISTA EL PROVEEDOR
        // const provedores = await Proveedor.findById( req.body.proveedor )

        // if( !provedores ){

        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'No existe este proveedor'
        //     })

        // }

        //Actualizaciones
        const { n_factura, n_control, ...campos  } = req.body;

        if( feltepDB.n_factura != n_factura ){

            const existefactura = await Fleteprimario.findOne({ n_factura: n_factura })

            if( existefactura ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe esta factura que estas modificando'
                })
            }

        }

        if( feltepDB.n_control != n_control ){

            const existecontrol = await Fleteprimario.findOne({ n_control: n_control })

            if( existecontrol ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe este numero de control que estas modificando'
                })
            }

        }

        campos.n_factura = n_factura;
        campos.n_control = n_control;

        const fleteprimarioActualizado = await Fleteprimario.findByIdAndUpdate( uid, campos, { new : true } )

        res.json({
            ok: true,
            fletep: fleteprimarioActualizado    
        })


    }catch(err){

        console.log(err);
        throw res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

/*=============================================
OBTENER EL ULTIMO REGISTRO DEL FLETE PRIMARIO
=============================================*/
const getFletepLimit = async (req, res = response)=>{

    try{

        //TRAER el ultimo dato registrado
        const flete = await Fleteprimario.find().sort({$natural:-1}).limit(1);

        res.status(200).json({
            ok:true,
            flete
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
FILTRADO POR RANGO DE FECHAS DE REGISTROS DE FLETE PRIMARIO
=============================================*/
const filterFecha = async( req, res = response )=>{

    try{

        // console.log( req.query.fecha_inicial )

        if( new Date(req.query.fecha_inicial) != 'Invalid Date' || new Date(req.query.fecha_final) != 'Invalid Date' ){

            //Guardando el rango de fechas
            const fechaInicial = req.query.fecha_inicial;
            const fechaFinal = req.query.fecha_final;
    
            const reg = await Fleteprimario.find({
                fecha_emision: {
                    $gte:fechaInicial,
                    $lt:fechaFinal
                }
            })
            .populate('usuario', 'nombre identificacion')
            .populate('proveedor', 'nombre identificacion')

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

    getFletep,
    postFletep,
    putFletep,
    getFletepid,
    getFletepLimit,
    filterFecha

}