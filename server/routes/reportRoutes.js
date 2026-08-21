const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  childReport,
  growthReport,
  attendanceReport,
  nutritionReport,
  vaccinationReport,
} = require("../controllers/reportController");

// Child Report
router.get("/child/:childId", verifyToken, childReport);

// Growth Report
router.get("/growth/:childId", verifyToken, growthReport);

// Attendance Report
router.get("/attendance/:childId", verifyToken, attendanceReport);

// Nutrition Report
router.get("/nutrition/:childId", verifyToken, nutritionReport);

// Vaccination Report
router.get("/vaccination/:childId", verifyToken, vaccinationReport);

module.exports = router;
