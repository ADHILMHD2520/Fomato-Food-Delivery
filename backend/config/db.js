const mongoose = require("mongoose")

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log("db connected");
        
    } catch (error) {
        console.log("Db coonection error",error);
        
    }
}
module.exports=connectDb;