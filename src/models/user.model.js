//Vamosa realizar un nuevo esquema

// Crear modelo de usuario, registro de usuario, encriptar password y generar token

import mongoose from "mongoose";

const {Schema,model} = mongoose;

const userSchema = new Schema({

    name :{
        type:String,
        require:[true,"El campo nombre es obligatorio "]
    },
    email :{
        type:String,
        require:[true,"El campo Email es obligatorio "],
        unique:true

    },
    password :{
        type: String,
        require:[true,"El campo Password es obligatorio "]
    },
},{ timestamps:true})



//Creamos nuestra constante  y asi exportar nuestro modelo que el nombre 
//va a ser user ya que mongo lo cambia a users y colocamos el Schema que 
//queremos que tome que es el que acabamos de crear

export const userModel = model("user",userSchema)

//Una vez hecho esto creamos el controlador, para obtener , enviar , y guardar datos de el Schema creado

