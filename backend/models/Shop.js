const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
    }


}, { timestamps: true })

module.exports = mongoose.model("Shop", shopSchema);