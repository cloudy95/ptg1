const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    signo:{
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
    rubro:{
        type: Schema.Types.ObjectId,
        ref: 'Rubro',
        required: true
    },
    ciiv:{ 
        type: String,
        required: true,
    },
    responsable_v: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fecha:{
        type: String
    },
    estado:{
        type:Boolean
    }

}, { collection: 'Clientes' } )

ClienteSchema.index( { '$**': 'text' } )

ClienteSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Cliente', ClienteSchema )