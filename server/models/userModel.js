const db = require("../config/db");
const getProfile = async (userId) => {
  const sql = `
        SELECT
            user_id,
            full_name,
            email,
            phone,
            role,
            status,
            created_at
        FROM users
        WHERE user_id = ?
    `;

  const [rows] = await db.query(sql, [userId]);

  return rows[0];
};
// Create User

const createUser = async (user) => {
  const sql = `
        INSERT INTO users
        (full_name, email, phone, password, role, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  const values = [
    user.full_name,
    user.email,
    user.phone,
    user.password,
    user.role,
    user.status || "active",
  ];

  const [result] = await db.query(sql, values);
  return result;
};

// Find User by Email
const findUserByEmail = async (email) => {
  const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

  const [rows] = await db.query(sql, [email]);

  return rows[0];
};

// Find User by ID
const findUserById = async (id) => {
  const sql = `
        SELECT
            user_id,
            full_name,
            email,
            phone,
            role,
            status,
            created_at
        FROM users
        WHERE user_id = ?
    `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

// Get All Users
const getAllUsers = async () => {
  const sql = `
        SELECT
            user_id,
            full_name,
            email,
            phone,
            role,
            status
        FROM users
        ORDER BY user_id DESC
    `;

  const [rows] = await db.query(sql);

  return rows;
};

// Update User
const updateUser = async (id, user) => {
  const sql = `
        UPDATE users
        SET
            full_name = ?,
            email = ?,
            phone = ?,
            role = ?,
            status = ?
        WHERE user_id = ?
    `;

  const values = [
    user.full_name,
    user.email,
    user.phone,
    user.role,
    user.status,
    id,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// Delete User
const deleteUser = async (id) => {
  const sql = `
        DELETE FROM users
        WHERE user_id = ?
    `;

  const [result] = await db.query(sql, [id]);

  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getProfile,
};
