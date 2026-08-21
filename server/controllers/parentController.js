const {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
} = require("../models/parentModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");

/**
 * Create Parent
 * POST /api/parents
 */
const addParent = async (req, res) => {
  try {
    const {
      user_id,
      center_id,
      father_name,
      mother_name,
      guardian_name,
      relationship,
      occupation,
      annual_income,
      aadhaar_no,
      address,
    } = req.body;

    if (!user_id || !center_id || !mother_name) {
      return errorResponse(
        res,
        "user_id, center_id and mother_name are required",
        400,
      );
    }

    const result = await createParent({
      user_id,
      center_id,
      father_name,
      mother_name,
      guardian_name,
      relationship,
      occupation,
      annual_income,
      aadhaar_no,
      address,
    });

    return successResponse(
      res,
      "Parent Added Successfully",
      {
        parent_id: result.insertId,
      },
      201,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get All Parents
 * GET /api/parents
 */
const getParents = async (req, res) => {
  try {
    const parents = await getAllParents();

    return successResponse(res, "Parents Retrieved Successfully", parents);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get Parent By ID
 * GET /api/parents/:id
 */
const getParent = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await getParentById(id);

    if (!parent) {
      return errorResponse(res, "Parent Not Found", 404);
    }

    return successResponse(res, "Parent Retrieved Successfully", parent);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Update Parent
 * PUT /api/parents/:id
 */
const editParent = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await getParentById(id);

    if (!parent) {
      return errorResponse(res, "Parent Not Found", 404);
    }

    await updateParent(id, req.body);

    return successResponse(res, "Parent Updated Successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Delete Parent
 * DELETE /api/parents/:id
 */
const removeParent = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await getParentById(id);

    if (!parent) {
      return errorResponse(res, "Parent Not Found", 404);
    }

    await deleteParent(id);

    return successResponse(res, "Parent Deleted Successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  addParent,
  getParents,
  getParent,
  editParent,
  removeParent,
};
