const express = require("express");
const router = express.Router();

const {
  addCenter,
  getCenters,
  getCenter,
  editCenter,
  removeCenter,
} = require("../controllers/anganwadiCenterController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// =========================
// Anganwadi Center Routes
// =========================

// Create Center (Admin Only)
router.post("/", authMiddleware, roleMiddleware("admin"), addCenter);

// Get All Centers
router.get("/", authMiddleware, getCenters);

// Get Center By ID
router.get("/:id", authMiddleware, getCenter);

// Update Center
router.put("/:id", authMiddleware, roleMiddleware("admin"), editCenter);

// Delete Center
router.delete("/:id", authMiddleware, roleMiddleware("admin"), removeCenter);

module.exports = router;
