const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    category: {
        type: String,
        enum: [
            "Biriyani",
            "Pizza",
            "Burger",
            "Fried Chicken",
            "Shawarma",
            "Chinese",
            "South Indian",
            "North Indian",
            "Noodles",
            "Dosa",
            "Desserts",
            "Ice Creams",
            "Cakes",
            "Drinks",
            "Healthy Food"
        ],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    foodType: {
        type: String,
        enum: ["veg", "non-veg"],
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Items", itemSchema)