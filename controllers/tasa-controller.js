const { response } = require('express');

const Tasa = require('../models/tasa')

/*=============================================
TRAER LA TASA
=============================================*/
const getTasa = async( req, res = response )=>{

    try{

        const tasa = await Tasa.find();

        res.status(200).json({

            ok:true,
            tasa

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
CREAR LA TASA
=============================================*/
const postTasa = async( req, res = response )=>{

    try{

        const tasa = new Tasa({
            ...req.body
        })

        const tasaDB = await tasa.save()

        res.status(200).json({
            ok:true,
            rubro: tasaDB
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
EDITAR LA TASA
=============================================*/
const putTasa = async( req, res = response )=>{

    const uid = req.params.id;

    try{

        const tasaDB = await Tasa.findById( uid )

        if( !tasaDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            })
        }

        const tasaAct = await Tasa.findByIdAndUpdate( uid, req.body , { new : true } )

        res.status(200).json({
            ok:true,
            tasaAct
        })


    }catch(err){

        console.log(err);
        throw res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


module.exports = {

    getTasa,
    postTasa,
    putTasa

}