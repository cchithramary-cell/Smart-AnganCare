const db = require("../config/db");

// ==========================
// Add Vaccination
// ==========================
const addVaccination = async (data) => {
  const sql = `
    INSERT INTO vaccinations
    (
      child_id,
      vaccine_name,
      due_date,
      vaccination_date,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [
    data.child_id,
    data.vaccine_name,
    data.due_date,
    data.vaccination_date || null,
    data.status,
  ]);

  return result;
};

// ==========================
// Get All Vaccinations
// ==========================
const getVaccinations = async () => {
  const sql = `
    SELECT
      v.*,
      c.child_name
    FROM vaccinations v
    JOIN children c
      ON v.child_id = c.child_id
    ORDER BY v.vaccination_id DESC
  `;

  const [rows] = await db.execute(sql);

  return rows;
};

// ==========================
// Get Vaccination By ID
// ==========================
const getVaccinationById = async (id) => {
  const sql = `
    SELECT *
    FROM vaccinations
    WHERE vaccination_id = ?
  `;

  const [rows] = await db.execute(sql, [id]);

  return rows[0];
};

// ==========================
// Update Vaccination
// ==========================
const updateVaccination = async (id, data) => {
  const sql = `
    UPDATE vaccinations
    SET
      child_id = ?,
      vaccine_name = ?,
      due_date = ?,
      vaccination_date = ?,
      status = ?
    WHERE vaccination_id = ?
  `;

  const [result] = await db.execute(sql, [
    data.child_id,
    data.vaccine_name,
    data.due_date,
    data.vaccination_date || null,
    data.status,
    id,
  ]);

  return result;
};

// ==========================
// Delete Vaccination
// ==========================
const deleteVaccination = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM vaccinations WHERE vaccination_id = ?",
    [id],
  );

  return result;
};

module.exports = {
  addVaccination,
  getVaccinations,
  getVaccinationById,
  updateVaccination,
  deleteVaccination,
};
