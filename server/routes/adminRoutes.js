const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
} = require("../controllers/adminController");

/*
====================================================
            Manager Management Routes
====================================================
*/

// Get All Managers (Admin Only)
router.get("/managers", authMiddleware, roleMiddleware("admin"), getManagers);

// Get Manager By ID (Admin Only)
router.get(
  "/managers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getManager,
);

// Create Manager (Admin Only)
router.post(
  "/managers",
  authMiddleware,
  roleMiddleware("admin"),
  createManager,
);

// Update Manager (Admin Only)
router.put(
  "/managers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateManager,
);

// Delete Manager (Admin Only)
router.delete(
  "/managers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteManager,
);

module.exports = router;
