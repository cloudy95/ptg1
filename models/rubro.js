const { Schema, model } = require('mongoose');

const RubroSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    }

})

RubroSchema.index( { '$**': 'text' } )

RubroSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Rubro', RubroSchema )