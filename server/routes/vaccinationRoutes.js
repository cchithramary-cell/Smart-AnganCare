const express = require("express");
const router = express.Router();

const vaccinationController = require("../controllers/vaccinationController");

// ==============================
// Get All Vaccinations
// GET /api/vaccinations
// ==============================
router.get("/", vaccinationController.getVaccinations);

// ==============================
// Get Vaccination By ID
// GET /api/vaccinations/:id
// ==============================
router.get("/:id", vaccinationController.getVaccination);

// ==============================
// Add Vaccination
// POST /api/vaccinations
// ==============================
router.post("/", vaccinationController.addVaccination);

// ==============================
// Update Vaccination
// PUT /api/vaccinations/:id
// ==============================
router.put("/:id", vaccinationController.updateVaccination);

// ==============================
// Delete Vaccination
// DELETE /api/vaccinations/:id
// ==============================
router.delete("/:id", vaccinationController.deleteVaccination);

module.exports = router;
