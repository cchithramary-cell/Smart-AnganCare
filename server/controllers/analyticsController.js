const {
  getDashboardStats,
  getNutritionStats,
  getVaccinationStats,
  getGrowthStats,
} = require("../models/analyticsModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// =========================================
// Admin Analytics Dashboard
// =========================================
const dashboardStats = async (req, res) => {
  try {
    const data = await getDashboardStats();

    successResponse(res, "Analytics Loaded Successfully", data);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};
// =================================
// Vaccination Analytics
// =================================
const vaccinationStats = async (req, res) => {
  try {
    const data = await getVaccinationStats();

    successResponse(res, "Vaccination Analytics Loaded", data);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// =====================================
// Nutrition Analytics
// =====================================
const nutritionStats = async (req, res) => {
  try {
    const data = await getNutritionStats();

    successResponse(res, "Nutrition Analytics Loaded", data);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};
// =================================
// Growth Analytics
// =================================
const growthStats = async (req, res) => {
  try {
    const data = await getGrowthStats();

    successResponse(res, "Growth Analytics Loaded", data);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  dashboardStats,
  nutritionStats,
  vaccinationStats,
  growthStats,
};
