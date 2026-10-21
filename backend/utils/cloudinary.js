const cloudinary = require("cloudinary").v2;

const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const result = await cloudinary.uploader.upload(file)
        await fs.unlinkSync(file)   //delete the image file
        return result.secure_url
    } catch (error) {
        await fs.unlinkSync(file)   //delete the image file
        console.log(" cloudinary error====",error)
    }
}