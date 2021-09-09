/*

    CONTROLADORES

*/

const { response } = require('express')

const Proveedores = require('../models/proveedores')

/*=============================================
	TRAER PROVEEDORES
=============================================*/
const getProveedores = async (req, res = response)=>{

    try{

        const provedor = await Proveedores.find()
                                        .populate('usuario', 'nombre identificacion')
  
        res.status(200).json({
            ok:true,
            provedor
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
	TRAER PROVEEDORES POR EL ID
=============================================*/
const getProveedoresid = async (req, res = response)=>{

    const uid = req.params.id;

    try{

        const provedor = await Proveedores.findById(uid)

        if( !provedor ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }
  
        res.status(200).json({
            ok:true,
            provedor
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
	CREAR PROVEEDORES
=============================================*/
const crearProveedores = async (req, res = response)=>{

    try{

        const { identificacion } = req.body

        const existteIdentifi = await Proveedores.findOne({ identificacion })

        if( existteIdentifi ){

            return res.status(400).json({

                ok:false,
                msg: 'La identicacion ya esta registrada'
            })

        }

        const uid = req.uid;
        const proveedores = new Proveedores({
            usuario: uid,
            ...req.body
        })

        const proveedorDB = await proveedores.save();

        res.status(200).json({
            ok:true,
            proveedores: proveedorDB
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
	ACTUALIZAR PROVEEDORES
=============================================*/
const actualizarProveedores = async(req, res = response)=>{

    const uid = req.params.id;

    try{

        const proveedorDB = await Proveedores.findById( uid )

        if( !proveedorDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        //Actualizaciones
        const { identificacion, ...campos  } = req.body;

        if( proveedorDB.identificacion != identificacion ){

            const existeIdentificacion = await Proveedores.findOne({ identificacion })

            if( existeIdentificacion ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe esta identificacion'
                })
            }

        }

        campos.identificacion = identificacion;

        const proveedoresActualizado = await Proveedores.findByIdAndUpdate( uid, campos, { new : true } )

        res.status(200).json({
            ok:true,
            proveedor: proveedoresActualizado
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
	BORRAR PROVEEDORES
=============================================*/
const borrarProveedores = async(req, res = response)=>{

    try{

        const uid = req.params.id;

        const proveedorDB = await Proveedores.findById( uid )

        if( !proveedorDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        await Proveedores.findByIdAndDelete( uid )

        res.status(200).json({
            ok:true,
            msg:'Proveedor borrado'
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

    getProveedores,
    getProveedoresid,
    crearProveedores,
    actualizarProveedores,
    borrarProveedores

}