
const { response } = require('express')

const Cliente =  require('../models/clientes')
const Rubro = require( '../models/rubro' )
const Proveedor = require( '../models/proveedores' )
const Usuario = require( '../models/usuario' )

const getBusqueda = async ( req, res = response )=>{

    try{

        const busqueda = req.params.busqueda;
        const regex = new RegExp( busqueda, 'i' );

        const [ clientes, rubro, proveedores ] = await Promise.all([

            Cliente.find({  nombre : regex  }),
            Rubro.find({ nombre: regex }),
            Proveedor.find({ nombre: regex })

        ])

        // console.log( clientes )

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
        const busqueda = req.params.busqueda.toLowerCase();
        const collection = req.params.collection;
        const regex = new RegExp( busqueda, 'i' );

        let data = [];

        switch( tabla ){

            case 'clientes':

                data = await Cliente.find( {$text: {$search: regex} } )
                    .populate('responsable_v', 'nombre apellido identificacion')
                    .populate('rubro', 'nombre')

            break;                 

            case 'rubro':

                 data = await Rubro.find( {$text: {$search: regex} } )
                                        .populate('usuario', 'nombre apellido identificacion')

            break;

            case 'proveedores':

                data = await Proveedor.find( {$text: {$search: regex} } )
                                        .populate('usuario', 'nombre apellido identificacion')

            break;

            case 'usuarios':

                data = await Usuario.find( {$text: {$search: regex} } )

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