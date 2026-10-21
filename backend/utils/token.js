const jwt = require("jsonwebtoken");

const tokenGen = async (userId) => {        //for which user is for token viauserId
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("token generation error=====", error);

    }
}

module.exports = tokenGen;