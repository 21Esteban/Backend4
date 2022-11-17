//configuracion de cloudinary para subir nuestras imagenes/archivos a la nube

import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: "ddbf82xnm",
    api_key:"992844364613673",
    api_secret:"QuFKdBucSzmdB6kjMPZx0TgKQeQ",
})

export default cloudinary;