const vaccinationService = require("../services/vaccinationService");

// ==============================
// Add Vaccination
// ==============================
const addVaccination = async (req, res) => {
  try {
    const result = await vaccinationService.addVaccination(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Vaccinations
// ==============================
const getVaccinations = async (req, res) => {
  try {
    const result = await vaccinationService.getVaccinations();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Vaccination By ID
// ==============================
const getVaccination = async (req, res) => {
  try {
    const result = await vaccinationService.getVaccination(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Vaccination
// ==============================
const updateVaccination = async (req, res) => {
  try {
    const result = await vaccinationService.updateVaccination(
      req.params.id,
      req.body,
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Vaccination
// ==============================
const deleteVaccination = async (req, res) => {
  try {
    const result = await vaccinationService.deleteVaccination(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addVaccination,
  getVaccinations,
  getVaccination,
  updateVaccination,
  deleteVaccination,
};
