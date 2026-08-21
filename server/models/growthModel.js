const db = require("../config/db");

// Get All Growth Records
const getAllGrowthRecords = async () => {
  const [rows] = await db.query(
    "SELECT * FROM growth_records ORDER BY record_id DESC",
  );

  return rows;
};

// Get Single Growth Record
const getGrowthRecordById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM growth_records WHERE record_id=?",
    [id],
  );

  return rows[0];
};

// Add Growth Record
const createGrowthRecord = async (growth) => {
  const { child_id, month, height, weight, bmi } = growth;

  const [result] = await db.query(
    `INSERT INTO growth_records
    (child_id,month,height,weight,bmi)
    VALUES(?,?,?,?,?)`,
    [child_id, month, height, weight, bmi],
  );

  return result;
};

// Update Growth Record
const updateGrowthRecord = async (id, growth) => {
  const { child_id, month, height, weight, bmi } = growth;

  const [result] = await db.query(
    `UPDATE growth_records
     SET child_id=?,
         month=?,
         height=?,
         weight=?,
         bmi=?
     WHERE record_id=?`,
    [child_id, month, height, weight, bmi, id],
  );

  return result;
};

// Delete Growth Record
const deleteGrowthRecord = async (id) => {
  const [result] = await db.query(
    "DELETE FROM growth_records WHERE record_id=?",
    [id],
  );

  return result;
};

module.exports = {
  getAllGrowthRecords,
  getGrowthRecordById,
  createGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
};
