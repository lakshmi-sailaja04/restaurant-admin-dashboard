const express = require("express");
const {
  getAnalyticsSummary,
  getTopSellers,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/summary", getAnalyticsSummary);
router.get("/top-sellers", getTopSellers);

module.exports = router;
