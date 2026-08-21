const db = require("../config/db");

// Create Center
const createCenter = async (center) => {
  const sql = `
        INSERT INTO anganwadi_centers
        (
            center_name,
            district,
            village,
            address,
            manager_id
        )
        VALUES (?, ?, ?, ?, ?)
    `;

  const values = [
    center.center_name,
    center.district,
    center.village,
    center.address,
    center.manager_id,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// Get All Centers
const getAllCenters = async () => {
  const sql = `
        SELECT *
        FROM anganwadi_centers
        ORDER BY center_id DESC
    `;

  const [rows] = await db.query(sql);

  return rows;
};

// Get Center By Id
const getCenterById = async (id) => {
  const sql = `
        SELECT *
        FROM anganwadi_centers
        WHERE center_id = ?
    `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

// Update Center
const updateCenter = async (id, center) => {
  const sql = `
        UPDATE anganwadi_centers
        SET
            center_name = ?,
            district = ?,
            village = ?,
            address = ?,
            manager_id = ?
        WHERE center_id = ?
    `;

  const values = [
    center.center_name,
    center.district,
    center.village,
    center.address,
    center.manager_id,
    id,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// Delete Center
const deleteCenter = async (id) => {
  const sql = `
        DELETE FROM anganwadi_centers
        WHERE center_id = ?
    `;

  const [result] = await db.query(sql, [id]);

  return result;
};

module.exports = {
  createCenter,
  getAllCenters,
  getCenterById,
  updateCenter,
  deleteCenter,
};
