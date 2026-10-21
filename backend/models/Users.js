const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    role: { type: String, enum: ['user', 'owner', 'deliveryboy'] }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)