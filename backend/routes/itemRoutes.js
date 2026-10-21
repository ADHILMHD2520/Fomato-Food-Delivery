const express = require("express");
const isAuth = require("../middleware/isAuth");

const {
    createItem,
    editItem
} = require("../controllers/itemController");

const router = express.Router();

router.post("/create", isAuth, createItem);
router.put("/edit/:shopId", isAuth, editShop);

module.exports = router;