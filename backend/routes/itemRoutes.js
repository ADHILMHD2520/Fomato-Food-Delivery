const express = require("express");
const isAuth = require("../middleware/isAuth");
const upload = require("../middleware/multer");

const {
    createItem,
    editItem,
    getItems,
    getItem,
    deleteItem,
    getItemsByCity
} = require("../controllers/itemController");

const router = express.Router();

router.post("/create-item", isAuth, upload.single("image"), createItem);
router.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
router.get("/get-items/:shopId", isAuth, getItems);
router.get("/get-item/:itemId", isAuth, getItem);
router.delete("/delete-item/:itemId", isAuth, deleteItem);
router.get("/get-by-city/:city", isAuth, getItemsByCity);

module.exports = router;