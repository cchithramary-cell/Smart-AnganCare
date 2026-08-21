const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  dashboard,
  myChild,
  myGrowth,
  myAttendance,
  myNutrition,
  myVaccination,
  reports,
} = require("../controllers/parentDashboardController");

// Parent Dashboard
router.get("/dashboard", verifyToken, dashboard);

// Child Details
router.get("/child", verifyToken, myChild);

// Growth History
router.get("/growth", verifyToken, myGrowth);

// Attendance History
router.get("/attendance", verifyToken, myAttendance);

// Nutrition History
router.get("/nutrition", verifyToken, myNutrition);

// Vaccination History
router.get("/vaccination", verifyToken, myVaccination);

// Reports (Combined Growth & Vaccination)
router.get("/reports", verifyToken, reports);

module.exports = router;
