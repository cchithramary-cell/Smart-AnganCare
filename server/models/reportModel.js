const db = require("../config/db");

// ==========================================
// Child Report
// ==========================================
const getChildReport = async (childId) => {
  const [rows] = await db.query(
    `
    SELECT
      c.*,
      p.father_name,
      p.mother_name,
      ac.center_name
    FROM children c
    LEFT JOIN parents p
      ON c.parent_id = p.parent_id
    LEFT JOIN anganwadi_centers ac
      ON c.center_id = ac.center_id
    WHERE c.child_id = ?
    `,
    [childId],
  );

  return rows[0];
};

// ==========================================
// Growth Report
// ==========================================
const getGrowthReport = async (childId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM growth_records
    WHERE child_id = ?
    ORDER BY record_id DESC
    `,
    [childId],
  );

  return rows;
};

// ==========================================
// Attendance Report
// ==========================================
const getAttendanceReport = async (childId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM attendance
    WHERE child_id = ?
    ORDER BY attendance_date DESC
    `,
    [childId],
  );

  return rows;
};

// ==========================================
// Nutrition Report
// ==========================================
const getNutritionReport = async (childId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM nutrition
    WHERE child_id = ?
    ORDER BY recorded_date DESC
    `,
    [childId],
  );

  return rows;
};

// ==========================================
// Vaccination Report
// ==========================================
const getVaccinationReport = async (childId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM vaccinations
    WHERE child_id = ?
    ORDER BY due_date DESC
    `,
    [childId],
  );

  return rows;
};

module.exports = {
  getChildReport,
  getGrowthReport,
  getAttendanceReport,
  getNutritionReport,
  getVaccinationReport,
};
