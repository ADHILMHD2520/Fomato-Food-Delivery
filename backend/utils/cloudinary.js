// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// const uploadOnCloudinary = async (file) => {
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     try {
//         const result = await cloudinary.uploader.upload(file);
//         return result.secure_url;
//     } finally {
//         if (fs.existsSync(file)) fs.unlinkSync(file);
//     }
// };

// module.exports = uploadOnCloudinary;

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("CLOUD:", JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
        "KEY:", JSON.stringify(process.env.CLOUDINARY_API_KEY),
        "SECRET len:", process.env.CLOUDINARY_API_SECRET?.length,
        "SECRET start:", process.env.CLOUDINARY_API_SECRET?.slice(0, 4));

    try {
        const result = await cloudinary.uploader.upload(file);
        return result.secure_url;
    } finally {
        if (fs.existsSync(file)) fs.unlinkSync(file);
    }
};

module.exports = uploadOnCloudinary;