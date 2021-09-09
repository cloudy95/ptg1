const { Schema, model } = require('mongoose');

const ventasSchema = Schema({

    orden:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fecha_emision:{
        type: String,
        required: true
    },
    pago:{
        type: String,
        required: true
    },
    flete_p:{
        type: Schema.Types.ObjectId,
        ref: 'Fleteprimario',
        required: true
    }
})

ventasSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Ventas',  ventasSchema )