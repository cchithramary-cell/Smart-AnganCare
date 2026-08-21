const express = require("express");
const router = express.Router();

const nutritionController = require("../controllers/nutritionController");

// Get all nutrition records
router.get("/", nutritionController.getNutrition);

// Get nutrition record by ID
router.get("/:id", nutritionController.getNutritionById);

// Add nutrition record
router.post("/", nutritionController.addNutrition);

// Update nutrition record
router.put("/:id", nutritionController.updateNutrition);

// Delete nutrition record
router.delete("/:id", nutritionController.deleteNutrition);

module.exports = router;
