const express = require("express");
const isAuth = require("../middleware/isAuth");
const upload = require("../middleware/multer");

const {
    createShop,
    editShop,
    getShop,
    getShopByCity
} = require("../controllers/shopController");

const router = express.Router();

router.post("/create", isAuth, upload.single("image"), createShop);
router.put("/edit/:shopId", upload.single("image"), isAuth, editShop);
router.get("/get-shop",isAuth,getShop)
router.get("/get-by-city/:city",isAuth,getShopByCity)

module.exports = router;