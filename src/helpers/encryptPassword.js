//Funcion para encriptar la contraseña del modelo que hicimos (user.model.js)

//Importamos las librerias que vamos a usar para eso

import bcrypt from "bcrypt"


//Funcion para encryptar esa contraseña del model que se la estamos pasando a la funcion (password)
export const encryptPassword=(password)=>{
    const salt = bcrypt.genSaltSync(10) //que le de 10 vuelticas a la password
    const passwordEncriptada = bcrypt.hashSync(password,salt)
    return passwordEncriptada
}