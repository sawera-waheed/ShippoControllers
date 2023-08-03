const express = require("express");
const router = express.Router();
const Order = require("./Shippo_api_controller");
router.post("/createOrder", Order.createOrder);
router.post("/createLabel", Order.createLabel);
module.exports = router;
