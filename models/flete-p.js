const { Schema, model } = require('mongoose');

const FleteprimarioSchema = Schema({

    orden_compra:{
        type: String,
        required: true
    },
    nombrechofer:{
        type: String,
        required: true
    },
    fecha_despacho:{
        type:String, 
        required: true,
    },
    hora_despacho:{
        type:String,
        required: true,
    },
    placa_chuto:{
        type:String,
        required: true
    },
    placa_sisterna:{
        type: String,
        required: true
    },
    identificacion_chofer:{
        type:String,
        required: true
    },
    cantidad_combustible:{
        type:Number,
        required: true
    },
    cantidad_venta:{
        type:Number ,
        required: true
    },
    n_factura:{
        type: String,
        required: true
    },
    n_control:{
        type: String,
        required: true
    },
    fecha_emision:{
        type: String,
        required: true
    },
    proveedor:{
        type: Schema.Types.ObjectId,
        ref:'Proveedores',
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    precio_compra:{
        type: Number,
        required: true
    },
    status:{
        type: String
    },
    saldo:{
        type: Number,
        required: true
    },
    abono:{
        type: Number,
        required: true
    }

})

FleteprimarioSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Fleteprimario',  FleteprimarioSchema )