const { Schema, model } = require('mongoose');

const fiscalizacionSchema = Schema({

    orden:{
        type: String,
        // required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    observacion:{
        type: String,
        required: true
    },
    fecha:{
        type:String
    }

})

fiscalizacionSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Fiscalizacion', fiscalizacionSchema )