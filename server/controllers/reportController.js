const {
  getChildReport,
  getGrowthReport,
  getAttendanceReport,
  getNutritionReport,
  getVaccinationReport,
} = require("../models/reportModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");

// Child Report
const childReport = async (req, res) => {
  try {
    const report = await getChildReport(req.params.childId);

    if (!report) {
      return errorResponse(res, "Child Not Found", 404);
    }

    successResponse(res, "Child Report Loaded Successfully", report);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// Growth Report
const growthReport = async (req, res) => {
  try {
    const report = await getGrowthReport(req.params.childId);

    successResponse(res, "Growth Report Loaded Successfully", report);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// Attendance Report
const attendanceReport = async (req, res) => {
  try {
    const report = await getAttendanceReport(req.params.childId);

    successResponse(res, "Attendance Report Loaded Successfully", report);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// Nutrition Report
const nutritionReport = async (req, res) => {
  try {
    const report = await getNutritionReport(req.params.childId);

    successResponse(res, "Nutrition Report Loaded Successfully", report);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// Vaccination Report
const vaccinationReport = async (req, res) => {
  try {
    const report = await getVaccinationReport(req.params.childId);

    successResponse(res, "Vaccination Report Loaded Successfully", report);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  childReport,
  growthReport,
  attendanceReport,
  nutritionReport,
  vaccinationReport,
};
