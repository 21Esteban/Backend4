//Ahora vamos a hacer uso del token para eso importamos la libreria

import jwt from "jsonwebtoken"

//El export const si nos damos cuenta son funciones que vamos a utilizar en otros archivos 


//el payload es la informacion que vamos a codificar
export const generateToken=(payload)=>{
    try {
        
        //En esta constante va a estar todo lo que queramos codificar, el "abc123" es una palabra secreat que yo escogi para codificarlo y descodifircarlo , si queremos le podemos dar una fecha de vencimiento a ese token 

        const token = jwt.sign(payload,"abc123",{
            expiresIn:"30d"
        })  

        return token;
    
    } catch (error) {
        console.log("Error en generateToken",error.message);
    }
}
