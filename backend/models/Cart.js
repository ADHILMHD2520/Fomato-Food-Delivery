const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",          // change to your user model's name
            required: true,
            unique: true          // one cart per user
        },
        items: [
            {
                id: { type: String, required: true },   // food item _id
                name: String,
                price: Number,
                image: String,
                shop: String,
                foodType: String,
                quantity: { type: Number, default: 1, min: 1 }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);