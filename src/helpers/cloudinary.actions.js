import cloudinary from "./cloudinary.config.js";
import { deleteImg } from "./deleteimg.js";



export const subirImagenACloudinary=async(file)=>{

    try {
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path)
        deleteImg(file.filename)
        return{
            secure_url,
            public_id,
        }
    } catch (error) {
        console.log("Error en subirImagenADloudinary" , error.message)
    }
}


export const eliminarImagenCloudinary=async(public_id)=>{
    try {
        await cloudinary.uploader.destroy(public_id)
    } catch (error) {
        console.log("Error en eliminarImagenCloudinary" , error.message)
    }
}