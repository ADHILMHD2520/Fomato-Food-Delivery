
const mongoose = require("mongoose");

// Individual food items inside a shop order
const shopOrderItemsSchema = new mongoose.Schema({
    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Individual shop order
const shopOrderSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    shopOrderItems: [shopOrderItemsSchema]
});

// Main customer order
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    deliveryAddress: {
        address: {
            type: String,
            required: true
        },
        latitude: Number,
        longitude: Number
    },

    paymentMethod: {
        type: String,
        enum: ["cod", "online"],
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    shopOrder: [shopOrderSchema]

}, { timestamps: true });

module.exports = mongoose.model("Orders", orderSchema);
