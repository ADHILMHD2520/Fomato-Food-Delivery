const Shop = require("../models/Shop");
const uploadOnCloudinary = require("../utils/cloudinary")

const createShop = async (req, res) => {

    try {
        const { name, city, state, address } = req.body;

        let image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const shop = await Shop.create({
            name, city, state, address, image, owner: req.userId
        })

        await shop.populate("owner")
        return res.status(201).json(shop);

    } catch (error) {
        return res.status(500).json({ message: `create shop error === ${error}` });
    }

}


const editShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;

        let image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const { shopId } = req.params;

        const shop = await Shop.findByIdAndUpdate(
            shopId,
            {
                name, 
                city, 
                state, 
                address, 
                image, 
                owner: req.userId
            },
            { new: true }
        )

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        await shop.populate("owner")
        return res.status(200).json(shop);

    } catch (error) {
        return res.status(500).json({ message: `edit shop error === ${error}` });
    }
}

module.exports = {
    createShop,
    editShop,
    
}