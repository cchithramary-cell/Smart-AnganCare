const db = require("../config/db");

// ==========================================
// GET ALL CHILDREN
// ==========================================
const getAllChildren = async () => {
  const sql = `
    SELECT
      c.child_id,
      c.parent_id,
      c.center_id,
      c.child_name,
      c.gender,
      c.dob,
      c.blood_group,
      c.birth_weight,
      c.current_height,
      c.current_weight,
      c.status,

      p.father_name,
      p.mother_name,

      ac.center_name

    FROM children c

    LEFT JOIN parents p
      ON c.parent_id = p.parent_id

    LEFT JOIN anganwadi_centers ac
      ON c.center_id = ac.center_id

    ORDER BY c.child_id DESC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

// ==========================================
// GET CHILD BY ID
// ==========================================
const getChildById = async (id) => {
  const sql = `
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
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

// ==========================================
// CREATE CHILD
// ==========================================
const createChild = async (child) => {
  const sql = `
    INSERT INTO children (
      parent_id,
      center_id,
      child_name,
      gender,
      dob,
      blood_group,
      birth_weight,
      current_height,
      current_weight,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    child.parent_id,
    child.center_id,
    child.child_name,
    child.gender,
    child.dob,
    child.blood_group || null,
    child.birth_weight || null,
    child.current_height || null,
    child.current_weight || null,
    child.status || "Active",
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// ==========================================
// UPDATE CHILD
// ==========================================
const updateChild = async (id, child) => {
  const sql = `
    UPDATE children
    SET
      parent_id = ?,
      center_id = ?,
      child_name = ?,
      gender = ?,
      dob = ?,
      blood_group = ?,
      birth_weight = ?,
      current_height = ?,
      current_weight = ?,
      status = ?
    WHERE child_id = ?
  `;

  const values = [
    child.parent_id,
    child.center_id,
    child.child_name,
    child.gender,
    child.dob,
    child.blood_group || null,
    child.birth_weight || null,
    child.current_height || null,
    child.current_weight || null,
    child.status || "Active",
    id,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// ==========================================
// DELETE CHILD
// ==========================================
const deleteChild = async (id) => {
  const sql = `
    DELETE FROM children
    WHERE child_id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
};
