const express = require("express");
const isAuth = require("../middleware/isAuth");

const {
    signup,
    getCurrentUser,
    signin
} = require("../controllers/userController")

const router = express.Router();


router.get("/current",isAuth,getCurrentUser);

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;