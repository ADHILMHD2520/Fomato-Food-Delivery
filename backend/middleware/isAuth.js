const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "token not found" });
        }
        
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodeToken) {
            return res.status(400).json({ message: "user not found" });
        }
        
        console.log("decodeToken====", decodeToken);
        
        req.userId = decodeToken.userId;
        next();


    } catch (error) {
        res.status(500).json({ message: "isAuth error",error });
    }
}

module.exports = isAuth;