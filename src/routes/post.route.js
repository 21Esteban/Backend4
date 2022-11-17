import { Router } from "express";
import postCtrol from "../controllers/post.controller.js";
import { upload } from "../middleware/imgUpload.js";
import {check} from "express-validator"
import { validFields } from "../middleware/ValidFields.js";
import { verifyToken } from "../middleware/auth.js";
 


const route = Router();

route.get("/",verifyToken,postCtrol.listar)
route.get("/userpost",verifyToken,postCtrol.listarPostLogin)



route.post("/",verifyToken,upload.single("img"),[
    check("title","El campo title es obligatorio").notEmpty(),
    check("description","El campo descripción es obligatorio").notEmpty().optional(),
],

validFields,postCtrol.add)
route.get("/:id",verifyToken,postCtrol.listarById)
route.delete("/:id",verifyToken,postCtrol.delete)
route.put("/:id",verifyToken,upload.single("img"),postCtrol.update)

export default route;