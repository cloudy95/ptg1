const { Schema, model } = require('mongoose');

const notaCreditoSchema = Schema({

    orden:{
        type: String,
        required: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    venta:{
        type: Schema.Types.ObjectId,
        ref: 'Ventas',
        required: true
    },
    fecha_emision:{
        type: String,
        required: true
    },
    totalD:{
        type: Number,
        required: true
    },
    totalP:{
        type: Number,
        required: true
    },
    saldo:{
        type: Number,
        required: true
    },
    abono:{
        type: Number,
        required: true
    },
    total_combustible:{
        type: Number,
        required: true
    },
    

})

notaCreditoSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Notacredito',  notaCreditoSchema )