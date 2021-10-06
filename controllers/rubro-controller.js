/*

    CONTROLADORES

*/

const { response } = require('express')

const Rubro = require( '../models/rubro' )

/*=============================================
	TAER RUBRO
=============================================*/
const getRubro = async (req, res = response)=>{

    try{

        const rubro = await Rubro.find()
                                .populate( 'usuario' )

        res.status(200).json({
            ok:true,
            rubro
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
	TAER RUBRO POR ID
=============================================*/
const getRubroid = async (req, res = response)=>{

    const uid = req.params.id;

    try{

        const rubro = await Rubro.findById(uid)

        if( !rubro ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }
  

        res.status(200).json({
            ok:true,
            rubro
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
	CREAR RUBRO
=============================================*/
const crearRubro = async (req, res = response)=>{

    try{

        const { nombre } = req.body;

        const existNombre = await Rubro.findOne({ nombre })
        
        if(  existNombre ){

            return res.status(400).json({

                ok:false,
                msg: 'Ya exciste este nombre'
            })

        }

        const uid = req.uid;
        const rubro = new Rubro({
            usuario: uid,
            ...req.body
        })

        const rubroDB = await rubro.save()

        res.status(200).json({
            ok:true,
            rubro: rubroDB
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
	ACTUALIZAR RUBRO
=============================================*/
const actualizarRubro = async (req, res = response)=>{

    const uid = req.params.id;

    try{

        const rubroDB = await Rubro.findById( uid )

        if( !rubroDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        //Actualizaciones
        const { nombre, ...campos  } = req.body;

        if( rubroDB.nombre != nombre ){

            const existeIdentificacion = await Rubro.findOne({ nombre })

            if( existeIdentificacion ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'Ya existe este nombre'
                })
            }

        }

        campos.nombre = nombre;

        const rubroActualizado = await Rubro.findByIdAndUpdate( uid, campos, { new : true } )

        res.status(200).json({
            ok:true,
            rubroActualizado
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
	BORRAR RUBRO
=============================================*/
const borrarRubro = async (req, res = response)=>{

    const uid = req.params.id;

    try{

        const rubroDB = await Rubro.findById( uid )

        if( !rubroDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        await Rubro.findByIdAndDelete( uid )

        res.status(200).json({
            ok:true,
            msg:'Rubro eliminado'
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

    getRubro,
    getRubroid,
    crearRubro,
    actualizarRubro,
    borrarRubro

}