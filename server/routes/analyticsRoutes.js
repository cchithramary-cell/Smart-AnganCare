const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  dashboardStats,
  nutritionStats,
  vaccinationStats,
  growthStats,
} = require("../controllers/analyticsController");
// ==============================
// Analytics Dashboard
// ==============================
router.get("/dashboard", verifyToken, dashboardStats);
router.get("/nutrition", verifyToken, nutritionStats);
router.get("/vaccination", verifyToken, vaccinationStats);
router.get("/growth", verifyToken, growthStats);
module.exports = router;
