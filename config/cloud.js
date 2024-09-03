import {CloudinaryStorage} from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'


// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

cloudinary.config({
    cloud_name: "gggarof",
    api_key: "784483167624656",
    api_secret: "DQrgJb_cGdqZd4y0luAhEXCwHo0"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'backend_api',
        allowedFormats: ['png', 'jpeg', 'jpg', 'webp']
    }
});

export { storage, cloudinary}