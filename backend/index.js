require("dotenv").config();
// inorder to use .env file datas

const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDb = require("./config/db")


const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes")
const itemRoutes = require("./routes/itemRoutes")



app.use(cors());

app.use(express.json());


app.use("/api/auth", userRoutes);

app.use("/api/shop", shopRoutes);

app.use("/api/item", itemRoutes);

app.listen(PORT, () => {
    console.log("connecting to db");
    connectDb();
    console.log("db connected");
    console.log(`server running on http://localhost:${PORT}`);
});
