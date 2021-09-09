const { Schema, model } = require('mongoose');

const ProveedoresSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    identificacion:{
        type: String,
        required: true,
        unique: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    compania:{
        type: String,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true
    }

} )

ProveedoresSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Proveedores', ProveedoresSchema )