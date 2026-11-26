const Cart = require("../models/Cart");

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId });
        return res.status(200).json({ items: cart ? cart.items : [] });
    } catch (error) {
        return res.status(500).json({ message: `get cart error ${error}` });
    }
};

const saveCart = async (req, res) => {
    try {
        const { items } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { user: req.userId },
            { items },
            { upsert: true, new: true }
        );
        return res.status(200).json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: `save cart error ${error}` });
    }
};

module.exports = { getCart, saveCart };