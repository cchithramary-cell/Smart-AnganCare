const express = require("express");

const router = express.Router();

const {
  getAttendanceRecords,
  getAttendanceRecord,
  addAttendanceRecord,
  editAttendanceRecord,
  removeAttendanceRecord,
} = require("../controllers/attendanceController");

const verifyToken = require("../middleware/authMiddleware");

// Get All Attendance
router.get("/", verifyToken, getAttendanceRecords);

// Get Attendance By ID
router.get("/:id", verifyToken, getAttendanceRecord);

// Add Attendance
router.post("/", verifyToken, addAttendanceRecord);

// Update Attendance
router.put("/:id", verifyToken, editAttendanceRecord);

// Delete Attendance
router.delete("/:id", verifyToken, removeAttendanceRecord);

module.exports = router;
