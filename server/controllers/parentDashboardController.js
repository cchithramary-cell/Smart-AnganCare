const {
  getDashboard,
  getMyChild,
  getMyGrowth,
  getMyAttendance,
  getMyNutrition,
  getMyVaccination,
} = require("../models/parentDashboardModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");

// ======================================
// Parent Dashboard
// ======================================
const dashboard = async (req, res) => {
  try {
    const data = await getDashboard(req.user.user_id);

    successResponse(res, "Dashboard Loaded Successfully", data);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// ======================================
// My Child
// ======================================
const myChild = async (req, res) => {
  try {
    const data = await getMyChild(req.user.user_id);

    successResponse(res, "Child Details Loaded Successfully", data);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// ======================================
// My Growth
// ======================================
const myGrowth = async (req, res) => {
  try {
    const data = await getMyGrowth(req.user.user_id);

    successResponse(res, "Growth Details Loaded Successfully", data);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// ======================================
// My Attendance
// ======================================
const myAttendance = async (req, res) => {
  try {
    const data = await getMyAttendance(req.user.user_id);

    successResponse(res, "Attendance Loaded Successfully", data);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// ======================================
// My Nutrition
// ======================================
const myNutrition = async (req, res) => {
  try {
    const data = await getMyNutrition(req.user.user_id);

    successResponse(res, "Nutrition Details Loaded Successfully", data);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// ======================================
// My Vaccination
// ======================================
const myVaccination = async (req, res) => {
  try {
    const data = await getMyVaccination(req.user.user_id);

    successResponse(res, "Vaccination Details Loaded Successfully", data);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

// ======================================
// Reports (Growth + Vaccination)
// ======================================
const reports = async (req, res) => {
  try {
    const [growthData, vaccinationData] = await Promise.all([
      getMyGrowth(req.user.user_id),
      getMyVaccination(req.user.user_id),
    ]);

    const reports = {
      growth: growthData,
      vaccinations: vaccinationData,
    };

    successResponse(res, "Reports Loaded Successfully", reports);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  dashboard,
  myChild,
  myGrowth,
  myAttendance,
  myNutrition,
  myVaccination,
  reports,
};
