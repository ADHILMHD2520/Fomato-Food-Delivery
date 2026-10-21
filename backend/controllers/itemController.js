const Items = require("../models/Items");
const uploadOnCloudinary = require("../utils/cloudinary");

const createItem = async (req, res) => {
    try {
        const { name, category, price, foodType } = req.body

        let image;
        if (req.file)
            image = await uploadOnCloudinary(req.file.path)

        const item = await Items.create({
            name, category, price, foodType, image, shop: req.userId
        })
        
        await item.populate("shop");

    } catch (error) {

    }
}

const editItem = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}




module.exports = {
    createItem,
    editItem,
    
}