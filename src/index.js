import cors from "cors"
import express from "express";
import morgan from "morgan"
import { connectDb } from "./database.js";
import  { dirname } from "path";

import { fileURLToPath } from "url";

import postRoutes from "./routes/post.route.js"
import userRoutes from "../src/routes/user.route.js"

connectDb();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();



app.set("Port", 4000);
app.use("/public",express.static(__dirname + "/storage/imgs"))
app.use(morgan("dev"));
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Ruta predeterminada

app.use("/post",postRoutes)

//Queremos que para userRoutes utilice predeterminadamente la ruta user

app.use("/user",userRoutes)


app.listen(app.get("Port"),()=>{
    console.log("Servidor escuchando por el puerto" , app.get("Port"));
});