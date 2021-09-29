const { Schema, model } = require('mongoose');

const ventasSchema = Schema({
     
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
    fecha_emision:{
        type: String,
        required: true
    },
    precio_litro:{
        type: String,
        required: true
    },
    venta:{
        type: String,
        required: true
    },
    total_combustible:{
        type: Number,
        required: true
    },
    precioD:{
        type: Number,
        required: true
    },
    precioP:{
        type: Number,
        required: true
    },
    type_pago:{
        type: String
    },
    pago:{
        type: Number
    },
    fecha_despacho:{
        type: String,
        required: true
    },
    hora_despacho:{
        type: String,
        required: true
    },
    nombre_chofer:{
        type: String,
        required: true
    },
    signo:{
        type: String,
        required: true
    },
    identificacion:{
        type: String,
        required: true
    },
    placa_chuto:{
        type: String,
        required: true
    },
    placa_cisterna:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    }

})

ventasSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Ventas',  ventasSchema )