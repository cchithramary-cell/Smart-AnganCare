const db = require("../config/db");

// ==========================================
// Get All Nutrition Records
// ==========================================
const getAllNutrition = async () => {
  const [rows] = await db.query(`
    SELECT *
    FROM nutrition
    ORDER BY nutrition_id DESC
  `);

  return rows;
};

// ==========================================
// Get Nutrition Record By ID
// ==========================================
const getNutritionById = async (id) => {
  const [rows] = await db.query(
    `
      SELECT *
      FROM nutrition
      WHERE nutrition_id = ?
    `,
    [id],
  );

  return rows[0];
};

// ==========================================
// Add Nutrition Record
// ==========================================
const addNutrition = async (nutritionData) => {
  const { child_id, weight, height, bmi, nutrition_status, recorded_date } =
    nutritionData;

  const [result] = await db.query(
    `
      INSERT INTO nutrition
      (
        child_id,
        weight,
        height,
        bmi,
        nutrition_status,
        recorded_date
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [child_id, weight, height, bmi, nutrition_status, recorded_date],
  );

  return result;
};

// ==========================================
// Update Nutrition Record
// ==========================================
const updateNutrition = async (id, nutritionData) => {
  const { child_id, weight, height, bmi, nutrition_status, recorded_date } =
    nutritionData;

  const [result] = await db.query(
    `
      UPDATE nutrition
      SET
        child_id = ?,
        weight = ?,
        height = ?,
        bmi = ?,
        nutrition_status = ?,
        recorded_date = ?
      WHERE nutrition_id = ?
    `,
    [child_id, weight, height, bmi, nutrition_status, recorded_date, id],
  );

  return result;
};

// ==========================================
// Delete Nutrition Record
// ==========================================
const deleteNutrition = async (id) => {
  const [result] = await db.query(
    `
      DELETE FROM nutrition
      WHERE nutrition_id = ?
    `,
    [id],
  );

  return result;
};

module.exports = {
  getAllNutrition,
  getNutritionById,
  addNutrition,
  updateNutrition,
  deleteNutrition,
};
