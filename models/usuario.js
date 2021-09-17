const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

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
    password:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    picture:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    sexo:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        // required: true,
        default: true

    },
    fecha:{
        type:String
    }

})

UsuarioSchema.index( { '$**': 'text' } )

UsuarioSchema.method( 'toJSON', function () {

    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Usuarios', UsuarioSchema )