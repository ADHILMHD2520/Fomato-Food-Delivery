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

        await shop.populate("owner items")
        return res.status(201).json(shop);

    } catch (error) {
        console.log("create shop error:", error);
        return res.status(500).json({
            message: `create shop error === ${error.message || JSON.stringify(error)}`
        })
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

        await shop.populate("owner items")
        return res.status(200).json(shop);

    } catch (error) {
        return res.status(500).json({ message: `edit shop error === ${error}` });
    }
}

const getShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.userId }).populate("owner items");
        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({ message: `get shop error==== ${error}` })
    }
}

const getShopByCity = async (req, res) => {
    try {

        const { city } = req.params
        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate('items')

        if(!shops){
            return res.status(400).json({message:`there are no shops in this ${city}`})
        }
        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({message:`get shop by city error == ${error}`})
    }
}

module.exports = {
    createShop,
    editShop,
    getShop,
    getShopByCity,

}