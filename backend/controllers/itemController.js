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

        return res.status(201).json(item);

    } catch (error) {
        return res.status(500).json({ message: `createItem error==> ${error}` })
    }
}

const editItem = async (req, res) => {
    try {
        const { name, category, price, foodType } = req.body

        let image;
        if (req.file)
            image = await uploadOnCloudinary(req.file.path)

        const { itemId } = req.params.itemId;

        const item = await Items.findByIdAndUpdate(
            shopId, {
            name, category, price, foodType, image

        }, {
            new: true
        }
        )
        if (!item) {
            return res.status(400).json({ message: `item not found` })
        }
    } catch (error) {
        return res.status(500).json({ message: `editItem error==> ${error}` })

    }
}




module.exports = {
    createItem,
    editItem,

}