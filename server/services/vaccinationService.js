const vaccinationModel = require("../models/vaccinationModel");

// ==============================
// Add Vaccination
// ==============================
const addVaccination = async (data) => {
  if (!data.child_id || !data.vaccine_name || !data.due_date) {
    throw new Error("Please fill all required fields.");
  }

  const result = await vaccinationModel.addVaccination(data);

  return {
    success: true,
    message: "Vaccination Added Successfully",
    vaccination_id: result.insertId,
  };
};

// ==============================
// Get All Vaccinations
// ==============================
const getVaccinations = async () => {
  const vaccinations = await vaccinationModel.getVaccinations();

  return {
    success: true,
    total: vaccinations.length,
    data: vaccinations,
  };
};

// ==============================
// Get Vaccination By ID
// ==============================
const getVaccination = async (id) => {
  const vaccination = await vaccinationModel.getVaccinationById(id);

  if (!vaccination) {
    throw new Error("Vaccination Record Not Found");
  }

  return {
    success: true,
    data: vaccination,
  };
};

// ==============================
// Update Vaccination
// ==============================
const updateVaccination = async (id, data) => {
  const vaccination = await vaccinationModel.getVaccinationById(id);

  if (!vaccination) {
    throw new Error("Vaccination Record Not Found");
  }

  await vaccinationModel.updateVaccination(id, data);

  return {
    success: true,
    message: "Vaccination Updated Successfully",
  };
};

// ==============================
// Delete Vaccination
// ==============================
const deleteVaccination = async (id) => {
  const vaccination = await vaccinationModel.getVaccinationById(id);

  if (!vaccination) {
    throw new Error("Vaccination Record Not Found");
  }

  await vaccinationModel.deleteVaccination(id);

  return {
    success: true,
    message: "Vaccination Deleted Successfully",
  };
};

module.exports = {
  addVaccination,
  getVaccinations,
  getVaccination,
  updateVaccination,
  deleteVaccination,
};
