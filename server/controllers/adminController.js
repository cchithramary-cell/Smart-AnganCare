const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

/**
 * Get All Managers
 * GET /api/admin/managers
 */
const getManagers = async (req, res) => {
  try {
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
      WHERE role = 'manager'
      ORDER BY user_id DESC
    `;

    const db = require("../config/db");
    const [managers] = await db.query(sql);

    return successResponse(res, "Managers Retrieved Successfully", managers);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get Manager By ID
 * GET /api/admin/managers/:id
 */
const getManager = async (req, res) => {
  try {
    const { id } = req.params;

    const manager = await findUserById(id);

    if (!manager || manager.role !== "manager") {
      return errorResponse(res, "Manager Not Found", 404);
    }

    return successResponse(res, "Manager Retrieved Successfully", manager);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Create Manager
 * POST /api/admin/managers
 */
const createManager = async (req, res) => {
  try {
    const { full_name, email, phone, password, status } = req.body;

    // Validation
    if (!full_name || !email || !password) {
      return errorResponse(
        res,
        "full_name, email, and password are required",
        400,
      );
    }

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "Email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await createUser({
      full_name,
      email,
      phone: phone || null,
      password: hashedPassword,
      role: "manager",
      status: status || "active",
    });

    return successResponse(
      res,
      "Manager Created Successfully",
      {
        user_id: result.insertId,
      },
      201,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Update Manager
 * PUT /api/admin/managers/:id
 */
const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, status } = req.body;

    // Check if manager exists
    const manager = await findUserById(id);
    if (!manager || manager.role !== "manager") {
      return errorResponse(res, "Manager Not Found", 404);
    }

    // Check if email is already taken by another user
    if (email && email !== manager.email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return errorResponse(res, "Email already exists", 409);
      }
    }

    // Update manager
    await updateUser(id, {
      full_name: full_name || manager.full_name,
      email: email || manager.email,
      phone: phone || manager.phone,
      role: "manager",
      status: status || manager.status,
    });

    return successResponse(res, "Manager Updated Successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Delete Manager
 * DELETE /api/admin/managers/:id
 */
const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if manager exists
    const manager = await findUserById(id);
    if (!manager || manager.role !== "manager") {
      return errorResponse(res, "Manager Not Found", 404);
    }

    // Delete manager
    await deleteUser(id);

    return successResponse(res, "Manager Deleted Successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
};
