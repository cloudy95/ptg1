
const { response } = require('express')

const Cliente =  require('../models/clientes')
const Rubro = require( '../models/rubro' )
const Proveedor = require( '../models/proveedores' )

const getBusqueda = async ( req, res = response )=>{

    try{

        const busqueda = req.params.busqueda;
        const regex = new RegExp( busqueda, 'i' );

        const [ clientes, rubro, proveedores ] = await Promise.all([

            Cliente.find({  nombre : regex  }),
            Rubro.find({ nombre: regex }),
            Proveedor.find({ nombre: regex })

        ])

        console.log( clientes )

        res.json({
            ok: true,
            clientes,
            rubro,
            proveedores
        })

    }catch(err){

        console.log( err )
    }   

}

const getBusquedaColeccion = async ( req, res = response )=>{

    // const tabla 

    try{

        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        const collection = req.params.collection;
        const regex = new RegExp( busqueda, 'i' );

        let data = [];

        switch( tabla ){

            case 'clientes':

                if( collection == 'nombre' ){

                    data = await Cliente.find({ nombre: regex })
                                         .populate('responsable_v', 'nombre identificacion')
                                        .populate('rubro', 'nombre')

                }else if(collection == 'identificacion'){

                    data = await Cliente.find({ identificacion: regex })
                                        .populate('responsable_v', 'nombre identificacion')
                                        .populate('rubro', 'nombre')

                }else if( collection == 'ciiv' ){ 

                    data = await Cliente.find({ ciiv: regex })
                                        .populate('responsable_v', 'nombre identificacion')
                                        .populate('rubro', 'nombre')

                }

            break;                 

            case 'rubro':
                data = await Rubro.find({ nombre: regex })
                                    .populate('usuario', 'nombre identificacion')

            break;

            case 'proveedores':

                if( collection == 'nombre' ){

                    data = await Proveedor.find({ nombre: regex })
                                        .populate('usuario', 'nombre identificacion')

                }else if(collection == 'identificacion'){

                    data = await Proveedor.find({ identificacion: regex })
                                            .populate('usuario', 'nombre identificacion')
                }

            break;

            default:
                return res.status(400).json({
                    ok:false,
                    msg: 'La tabla tiene que ser clientes/rubro/proveedores'
                })

        }

        res.json({
            ok: true,
            resultado: data
        })


    }catch(err){

        console.log( err )
    }   

}

module.exports = {

    getBusqueda,
    getBusquedaColeccion

}