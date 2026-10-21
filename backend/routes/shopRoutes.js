const express = require("express");
const isAuth = require("../middleware/isAuth");

const {
    createShop,
    editShop
} = require("../controllers/shopController");

const router = express.Router();

router.post("/create", isAuth, createShop);
router.put("/edit/:shopId", isAuth, editShop);

module.exports = router;