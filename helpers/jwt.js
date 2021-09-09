const jwt = require( 'jsonwebtoken' )

const generarJWT = ( uid )=>{

    return new Promise( (resolve,reject)=>{

        const paylod = {
            uid
        };
    
        jwt.sign( paylod, process.env.JWT_SECRET, {

            expiresIn: '12h'

        }, ( err, token )=>{

            if(err){

                console.log( err )
                reject('No se pudo generar el JWT')

            }else{

                resolve( token )
            }

        })

    })

} 

module.exports = {

    generarJWT
}