const express = require("express");
const isAuth = require("../middleware/isAuth");
const upload = require("../middleware/multer");

const {
    createItem,
    editItem
} = require("../controllers/itemController");

const router = express.Router();

router.post("/create-item", isAuth, upload.single("image"), createItem);
router.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

module.exports = router;