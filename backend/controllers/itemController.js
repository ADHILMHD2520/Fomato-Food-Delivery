const Items = require("../models/Items");
const Shop = require("../models/Shop");
const uploadOnCloudinary = require("../utils/cloudinary");

const createItem = async (req, res) => {
    try {
        const { name, category, price, foodType } = req.body;

        const shop = await Shop.findOne({ owner: req.userId });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        let image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        const item = await Items.create({
            name,
            category,
            price,
            foodType,
            image,
            shop: shop._id
        });

        return res.status(201).json(item);
    } catch (error) {
        return res.status(500).json({
            message: `createItem error ==> ${error}`
        });
    }
};

const getItems = async (req, res) => {
    try {
        const { shopId } = req.params;

        const items = await Items.find({
            shop: shopId
        });

        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({
            message: `getItems error ==> ${error}`
        });
    }
};

const getItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Items.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        const shop = await Shop.findOne({
            owner: req.userId
        });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        if (item.shop.toString() !== shop._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to view this item"
            });
        }

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({
            message: `getItem error ==> ${error}`
        });
    }
};

const editItem = async (req, res) => {
    try {
        const { name, category, price, foodType } = req.body;
        const { itemId } = req.params;

        const item = await Items.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        const shop = await Shop.findOne({
            owner: req.userId
        });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        if (item.shop.toString() !== shop._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to edit this item"
            });
        }

        let image = item.image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        item.name = name;
        item.category = category;
        item.price = price;
        item.foodType = foodType;
        item.image = image;

        await item.save();

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({
            message: `editItem error ==> ${error}`
        });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Items.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        const shop = await Shop.findOne({
            owner: req.userId
        });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        if (item.shop.toString() !== shop._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this item"
            });
        }

        await Items.findByIdAndDelete(itemId);

        return res.status(200).json({
            message: "Item deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: `deleteItem error ==> ${error}`
        });
    }
};

module.exports = {
    createItem,
    getItems,
    getItem,
    editItem,
    deleteItem
};