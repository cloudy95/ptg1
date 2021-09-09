const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () =>{

    try{

        await mongoose.connect(process.env.DB_CNN);

        console.log( 'DB online' )

    }catch(error){

        console.log( error )
        throw new Error( 'error a la hora de conectar en la bd' )

    }

}

module.exports = {
    dbConnection
}