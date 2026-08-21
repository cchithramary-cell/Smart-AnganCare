const db = require("../config/db");

// ================================
// Dashboard Statistics
// ================================
const getDashboardStats = async () => {
  const [[centers]] = await db.query(
    "SELECT COUNT(*) AS totalCenters FROM anganwadi_centers",
  );

  const [[managers]] = await db.query(
    "SELECT COUNT(*) AS totalManagers FROM users WHERE role='manager'",
  );

  const [[parents]] = await db.query(
    "SELECT COUNT(*) AS totalParents FROM parents",
  );

  const [[children]] = await db.query(
    "SELECT COUNT(*) AS totalChildren FROM children",
  );

  const [[attendance]] = await db.query(
    `
        SELECT
            SUM(status='Present') AS present,
            SUM(status='Absent') AS absent
        FROM attendance
        WHERE attendance_date = CURDATE()
        `,
  );

  const [[vaccination]] = await db.query(
    `
        SELECT
            SUM(status='Completed') AS completed,
            SUM(status='Pending') AS pending
        FROM vaccinations
        `,
  );

  const [[nutrition]] = await db.query(
    `
        SELECT
            ROUND(AVG(bmi),2) AS averageBMI
        FROM nutrition
        `,
  );

  return {
    totalCenters: centers.totalCenters,

    totalManagers: managers.totalManagers,

    totalParents: parents.totalParents,

    totalChildren: children.totalChildren,

    presentToday: attendance.present || 0,

    absentToday: attendance.absent || 0,

    vaccinationCompleted: vaccination.completed || 0,

    vaccinationPending: vaccination.pending || 0,

    averageBMI: nutrition.averageBMI || 0,
  };
};
// =================================
// Growth Analytics
// =================================
const getGrowthStats = async () => {
  const [rows] = await db.query(`
        SELECT
            month,
            height,
            weight
        FROM growth_records
        ORDER BY record_id
    `);

  return rows;
};
// =================================
// Vaccination Analytics
// =================================
const getVaccinationStats = async () => {
  const [[result]] = await db.query(`
        SELECT

        SUM(status='Completed') AS completed,

        SUM(status='Pending') AS pending

        FROM vaccinations
    `);

  return {
    completed: result.completed || 0,
    pending: result.pending || 0,
  };
};
// =================================
// Nutrition Analytics
// =================================
const getNutritionStats = async () => {
  const [[result]] = await db.query(`
        SELECT

        SUM(nutrition_status='Normal') AS normal,

        SUM(nutrition_status='Moderate') AS moderate,

        SUM(nutrition_status='Severe') AS severe

        FROM nutrition
    `);

  return {
    normal: result.normal || 0,
    moderate: result.moderate || 0,
    severe: result.severe || 0,
  };
};

module.exports = {
  getDashboardStats,
  getNutritionStats,
  getVaccinationStats,
  getGrowthStats,
};
