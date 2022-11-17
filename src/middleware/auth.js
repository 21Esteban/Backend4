//Middleware que nos va a validar que el usuario si este logueado para poder hacer peticiones al backend
//es decir si el usuario no esta logueado o registrado no puede ser sus post subidos ni poder editarlos

import jwt from "jsonwebtoken";
import { response } from "../helpers/Response.js";
import { userModel } from "../models/user.model.js";

//funcion para validar si el toquen es de mi backend y si es verdadero

export const verifyToken = async (req, res, next) => {
  let token = null;

  //Vamos a extraer la Authorization. Del postman la sacamos

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    //Ahora esto va a verificar que el token que estamos recibiendo sea el de nuestro backend
    jwt.verify(token, "abc123", async (err, payload) => {
      //Si tenemos un error es porque el token no lo genramos nostros , nos quieren hackear
      if (err) {
        return response(res, 401, false, null, "no estas autorizado");
      }

      const user = await userModel.findById({_id:payload.user})
      if(!user){
        return response(res, 401, false, null, "no estas autorizado");
      }

      //vamos a guardar por asi decirlo el registro del id qu enos da el payload
      req.userId = payload.user; //por que payload.user ? r/ por que el payload nos da a nostros lo que habiamos codificado ya descodificado pero nos lo trae con la expiracion y todo eso entonces nostros solo queremos el id por eso solo le decimos que nos envieel id
      next();
    });
  }

  //Si el token no existe enviamos este mensaje al cliente
  if (!token) {
    return response(res, 401, false, null, "no estas autorizado");
  }
};

//una vez hallamos hecho la funcion la llamamos en post.routes para que antes de listar o crear o eliminar , verifique el token
