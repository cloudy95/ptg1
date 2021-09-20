const { Schema, model } = require('mongoose');

const TasaSchema = Schema({

    tasa:{
        type: Number,
        requied: true
    }

})

TasaSchema.method( 'toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id

    return object
})

module.exports = model( 'Tasa',  TasaSchema )