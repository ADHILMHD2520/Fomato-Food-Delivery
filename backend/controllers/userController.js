const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const tokenGen = require("../utils/token");


const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                message: "user id not found"
            });
        }
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "getCurrentUser error",
            error: error.message
        });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should gretewr than 6 characters" });
        }
        if (mobile.length < 10) {
            return res.status(400).json({ message: "mobile number invalid" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const users = await Users.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            role,

        })

        const token = await tokenGen(users._id);

        console.log("✅ SIGN up SUCCESSFUL:", email);

        return res.status(201).json({ token });   //token is sent to the frontend


    } catch (error) {
        return res.status(500).json(`signup error === ${error}`);
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exists" });
        }

        const checkpwd = await bcrypt.compare(password, user.password);

        if (!checkpwd) {
            return res.status(400).json({ message: "password error" })
        }



        const token = await tokenGen(user._id);
        console.log("✅ SIGN IN SUCCESSFUL:", email);
        return res.status(201).json({ token });   //token is sent to the frontend




    } catch (error) {
        return res.status(500).json(`signin error === ${error}`);
    }
}



module.exports = {
    getCurrentUser,
    signup,
    signin,
}