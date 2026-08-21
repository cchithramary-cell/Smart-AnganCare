const express = require("express");
const router = express.Router();

const childController = require("../controllers/childController");
const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// Add Child
// Only Admin
// ===============================
router.post("/", authMiddleware, childController.createChild);

// ===============================
// Get All Children
// ===============================
router.get("/", authMiddleware, childController.getChildren);

// ===============================
// Get Child By ID
// ===============================
router.get("/:id", authMiddleware, childController.getChild);

// ===============================
// Update Child
// ===============================
router.put("/:id", authMiddleware, childController.updateChild);

// ===============================
// Delete Child
// ===============================
router.delete("/:id", authMiddleware, childController.deleteChild);

module.exports = router;
