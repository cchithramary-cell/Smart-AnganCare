const express = require("express");
const router = express.Router();

const {
  addParent,
  getParents,
  getParent,
  editParent,
  removeParent,
} = require("../controllers/parentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

/*
====================================================
            Parent Management Routes
====================================================
*/

// Create Parent (Admin & Manager)
router.post("/", authMiddleware, roleMiddleware("admin", "manager"), addParent);

// Get All Parents
router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getParents);

// Get Parent By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager", "parent"),
  getParent,
);

// Update Parent
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  editParent,
);

// Delete Parent
router.delete("/:id", authMiddleware, roleMiddleware("admin"), removeParent);

module.exports = router;
