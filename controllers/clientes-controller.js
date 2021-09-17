/*

    CONTROLADORES

*/

const { response } = require('express')

const Cliente = require('../models/clientes')

/*=============================================
	TRAER TODOS LOS CLIENTES POR PAGINACION
=============================================*/
const getClientes = async (req, res = response)=>{

    try{

        // console.log( req.query.desde )

        const desde = Number(req.query.desde) || 0;
        // const responsable = req.query.respon || '';

        if( desde == 0){

            const cliente = await  Cliente.find()
                                            .populate('responsable_v', 'nombre identificacion')
                                            .populate('rubro', 'nombre')
                                            
            const total = await Cliente.countDocuments();

            res.status(200).json({
                ok:true,
                cliente,
                total
            })

        }else if( desde != 0){

            //LAS PROMESAS SE EJECUTARAN DE MANERA SIMULTANEA
            const [ cliente, total ] = await Promise.all([

                 Cliente.find()
                .skip( desde )
                .limit( 5 ),

                Cliente.countDocuments()
                
                ])

            res.status(200).json({
                ok:true,
                cliente,
                total
            })

        }

        // if( responsable != '' ){

        //     //BUSCAR SI EL RESPONSABLE QUE SE ENVIA EXISTE!!!

        //     const cliente = await  Cliente.find({ responsable_v: responsable })

        //     res.status(200).json({
        //         ok:true,
        //         cliente
        //     })

        // }

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado... revisar logs'
        })

    }

}

/*=============================================
	TRAER CLIENTE POR SU ID
=============================================*/
const getClientespid = async( req, res = response )=>{

    try{

        const uid = req.params.id;

        const clienteDB = await Cliente.findById( uid )

        if( !clienteDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        res.status(200).json({

            ok:true,
            clienteDB

        })

    }catch(err){

        res.status(500).json({
            ok:false,
            msg:'Error inesperado...'
        })

    }

}

/*=============================================
	CREAR CLIENTES
=============================================*/
const crearClientes = async(req, res = response)=>{

    try{

        const { identificacion, ciiv } = req.body

        const existeIdentificacion = await Cliente.findOne({ identificacion })
        const existeCiiv = await Cliente.findOne({ ciiv })
        
        if( existeIdentificacion || existeCiiv){

            return res.status(400).json({

                ok:false,
                msg: 'La identicacion o el ciiv ya estan registrado'
            })

        }

        const uid = req.uid
        const cliente = new Cliente({
            responsable_v: uid,
            ...req.body});

        const clienteDB = await cliente.save()

        res.status(200).json({
            ok:true,
            cliente: clienteDB
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
	ACTUALIZAR CLIENTES
=============================================*/
const actualizarClientes = async (req, res = response)=>{

    const uid = req.params.id;

    try{

        const clientesDB = await Cliente.findById( uid )

        if( !clientesDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        //Actualizaciones
        const { identificacion, ciiv, ...campos  } = req.body;

        if( clientesDB.identificacion != identificacion ){

            const existeIdentificacion = await Cliente.findOne({ identificacion })

            if( existeIdentificacion ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe esta identificacion'
                })
            }

        }

        if( clientesDB.ciiv != ciiv ){

            const existeciiv = await Cliente.findOne({ ciiv })

            if( existeciiv ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe este ciiv'
                })
            }

        }

        campos.identificacion = identificacion;
        campos.ciiv = ciiv;

        const clienteActualizado = await Cliente.findByIdAndUpdate( uid, campos, { new : true } )

        res.status(200).json({
            ok:true,
            cliente: clienteActualizado
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
	BORRAR CLIENTES
=============================================*/
const borrarClientes = async (req, res = response)=>{

    const uid = req.params.id;

    try{

        const clientesDB = await Cliente.findById( uid )

        if( !clientesDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        await Cliente.findByIdAndDelete( uid )

        res.status(200).json({
            ok:true,
            msg:'Cliente borrado'
        })

    }catch( err ){

        console.log( err )
        res.status(500).json({

            ok:false,
            msg:'Error inesperado... revisar logs'
        })

    }

}


module.exports = {

    getClientes,
    crearClientes,
    actualizarClientes,
    borrarClientes,
    getClientespid


}