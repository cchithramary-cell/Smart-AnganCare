const nutritionModel = require("../models/nutritionModel");

// ==========================================
// Get All Nutrition Records
// ==========================================
exports.getNutrition = async (req, res) => {
  try {
    const nutrition = await nutritionModel.getAllNutrition();

    res.status(200).json({
      success: true,
      message: "Nutrition Records Loaded Successfully",
      data: nutrition,
    });
  } catch (error) {
    console.error("Get Nutrition Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load nutrition records",
      error: error.message,
    });
  }
};

// ==========================================
// Get Nutrition By ID
// ==========================================
exports.getNutritionById = async (req, res) => {
  try {
    const { id } = req.params;

    const nutrition = await nutritionModel.getNutritionById(id);

    if (!nutrition) {
      return res.status(404).json({
        success: false,
        message: "Nutrition record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition Record Loaded Successfully",
      data: nutrition,
    });
  } catch (error) {
    console.error("Get Nutrition By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load nutrition record",
      error: error.message,
    });
  }
};

// ==========================================
// Add Nutrition
// ==========================================
exports.addNutrition = async (req, res) => {
  try {
    const { child_id, weight, height, bmi, nutrition_status, recorded_date } =
      req.body;

    if (!child_id) {
      return res.status(400).json({
        success: false,
        message: "Child ID is required",
      });
    }

    const result = await nutritionModel.addNutrition({
      child_id,
      weight,
      height,
      bmi,
      nutrition_status,
      recorded_date,
    });

    res.status(201).json({
      success: true,
      message: "Nutrition Record Added Successfully",
      nutrition_id: result.insertId,
    });
  } catch (error) {
    console.error("Add Nutrition Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add nutrition record",
      error: error.message,
    });
  }
};

// ==========================================
// Update Nutrition
// ==========================================
exports.updateNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    const { child_id, weight, height, bmi, nutrition_status, recorded_date } =
      req.body;

    const existing = await nutritionModel.getNutritionById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Nutrition record not found",
      });
    }

    await nutritionModel.updateNutrition(id, {
      child_id,
      weight,
      height,
      bmi,
      nutrition_status,
      recorded_date,
    });

    res.status(200).json({
      success: true,
      message: "Nutrition Record Updated Successfully",
    });
  } catch (error) {
    console.error("Update Nutrition Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update nutrition record",
      error: error.message,
    });
  }
};

// ==========================================
// Delete Nutrition
// ==========================================
exports.deleteNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await nutritionModel.getNutritionById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Nutrition record not found",
      });
    }

    await nutritionModel.deleteNutrition(id);

    res.status(200).json({
      success: true,
      message: "Nutrition Record Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Nutrition Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete nutrition record",
      error: error.message,
    });
  }
};
