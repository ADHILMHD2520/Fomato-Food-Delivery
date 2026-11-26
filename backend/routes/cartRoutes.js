const express = require("express");
const { getCart, saveCart } = require("../controllers/cartController");
const isAuth = require("../middleware/isAuth");   // your auth middleware

const router = express.Router();

router.get("/", isAuth, getCart);
router.put("/", isAuth, saveCart);

module.exports = router;