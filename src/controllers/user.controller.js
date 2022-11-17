//Importamos nuestro modelo 
import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { response } from "../helpers/Response.js";

import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt"


//Ahora vamos a empezar con nuestras funciones del controlador

//Esta es la funcion en la que vamos a agarrar los datos de registro del cliente

const userCtrol = {}

 userCtrol.register = async (req,res) =>{
    try {
        const {email,password,name} = req.body;

        //vamos a validar que el email sea unico fijandonos en el modelo

        const user=await userModel.findOne({email})

        //Si encuentra este correo entonces va a enviarle esto al cliente

        if(user){
          return response(res,400,false,"","El correo ya esta en uso en otra cuenta")
        }

        //Hacemos uso de la funcion encryptpassword para que se guarde la clave del usuario encriptada

        const passwordEncrypt = encryptPassword(password)

        const newUser = userModel({email,password:passwordEncrypt,name})
        
        await newUser.save()

        //nosotros podemos codificar todo el usuario o soloamente el id , asi seria codificando todo el usuario sin la contraseña ya que esa la encryptamos

        // const token = generateToken({user:{...newUser,password:null}})

        //encriptar todo con password y todo

        // const token = generateToken({user:newUser})


    
        const token = generateToken({user:newUser._id})

        response(res,201,true, {...newUser.toJSON(),password:null, token} ,"Usuario creado correctamente")

    } catch (error) {
        response(res,500,false,null,"Error en la funcion register", error.message)
    }
 }

     //Ahora vamos a hacer la funcion del login


userCtrol.login = async (req,res)=>{
    try {
        
        //nosotros para logueanos vamos a requerir el correo y el password

        const {password,email} = req.body;

        //Vamos a confirmar que el correo ya este registrado

        const user = await userModel.findOne({email})

        //esta condicional que hicimos gracias a el bcrypt nos va a comparar el password de la database con el que el usuario ingrese

        if(user && bcrypt.compareSync(password,user.password)){

            const token = generateToken({user:user._id})

            return response(res,200,true,{...user.toJSON(),password:null,token},"Bienvenido")
        }
    
        response(res,400,false,null,"Correo o contraseña incorrectos")

    } catch (error) {
        response(res,500,false,null,"Error en la funcion login ",error.message)
    }
}





 export default userCtrol

//  En última, cuando nos referimos a cifrar un
//  mensaje, tiene que ver con ocultar la información 
//  basándose en la sintaxis del mensaje, es decir 
//  alterando los símbolos que lo componen; en cambio,
//  la codificación se basa en alterar la semántica del
//  mensaje, lo que está relacionado con el 
//  significado del mensaje.