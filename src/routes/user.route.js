//Importamos la rutas
import { Router } from "express";
//importamos nuestro controlador
import userCtrol from "../controllers/user.controller.js";



const route = Router()

route.post("/register",userCtrol.register)
route.post("/login",userCtrol.login)

export default route;
