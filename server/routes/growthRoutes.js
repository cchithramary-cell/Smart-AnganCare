const express = require("express");

const router = express.Router();

const {
  getGrowthRecords,
  getGrowthRecord,
  addGrowthRecord,
  editGrowthRecord,
  removeGrowthRecord,
} = require("../controllers/growthController");

const verifyToken = require("../middleware/authMiddleware");

// Get All Growth Records
router.get("/", verifyToken, getGrowthRecords);

// Get Single Growth Record
router.get("/:id", verifyToken, getGrowthRecord);

// Add Growth Record
router.post("/", verifyToken, addGrowthRecord);

// Update Growth Record
router.put("/:id", verifyToken, editGrowthRecord);

// Delete Growth Record
router.delete("/:id", verifyToken, removeGrowthRecord);

module.exports = router;
