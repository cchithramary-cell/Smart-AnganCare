const db = require("../config/db");

/**
 * Create Parent
 */
const createParent = async (parent) => {
  const sql = `
    INSERT INTO parents
    (
      user_id,
      center_id,
      father_name,
      mother_name,
      guardian_name,
      relationship,
      occupation,
      annual_income,
      address
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    parent.user_id,
    parent.center_id,
    parent.father_name,
    parent.mother_name,
    parent.guardian_name,
    parent.relationship,
    parent.occupation,
    parent.annual_income,
    parent.address,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

/**
 * Get All Parents
 */
const getAllParents = async () => {
  const sql = `
    SELECT
      p.parent_id,
      p.user_id,
      u.full_name,
      u.email,
      u.phone,
      c.center_name,
      p.father_name,
      p.mother_name,
      p.guardian_name,
      p.relationship,
      p.occupation,
      p.annual_income,
      p.aadhaar_no,
      p.address,
      p.created_at
    FROM parents p
    INNER JOIN users u
      ON p.user_id = u.user_id
    INNER JOIN anganwadi_centers c
      ON p.center_id = c.center_id
    ORDER BY p.parent_id DESC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

/**
 * Get Parent By ID
 */
const getParentById = async (id) => {
  const sql = `
    SELECT
      p.*,
      u.full_name,
      u.email,
      u.phone,
      c.center_name
    FROM parents p
    INNER JOIN users u
      ON p.user_id = u.user_id
    INNER JOIN anganwadi_centers c
      ON p.center_id = c.center_id
    WHERE p.parent_id = ?
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

/**
 * Update Parent
 */
const updateParent = async (id, parent) => {
  const sql = `
    UPDATE parents
    SET
      user_id = ?,
      center_id = ?,
      father_name = ?,
      mother_name = ?,
      guardian_name = ?,
      relationship = ?,
      occupation = ?,
      annual_income = ?,
      address = ?
    WHERE parent_id = ?
  `;

  const values = [
    parent.user_id,
    parent.center_id,
    parent.father_name,
    parent.mother_name,
    parent.guardian_name,
    parent.relationship,
    parent.occupation,
    parent.annual_income,
    parent.address,
    id,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

/**
 * Delete Parent
 */
const deleteParent = async (id) => {
  const sql = `
    DELETE FROM parents
    WHERE parent_id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

module.exports = {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
};
