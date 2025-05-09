import { v2 as cloudinary } from 'cloudinary';

export const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_URL,
        api_secret: process.env.CLOUD_SECRET
    });
}; 
