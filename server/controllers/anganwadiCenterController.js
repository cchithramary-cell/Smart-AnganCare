const {
  createCenter,
  getAllCenters,
  getCenterById,
  updateCenter,
  deleteCenter,
} = require("../models/anganwadiCenterModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");

/**
 * @desc Create Anganwadi Center
 * @route POST /api/centers
 * @access Admin
 */
const addCenter = async (req, res) => {
  try {
    const { center_name, district, village, address, manager_id } = req.body;

    if (!center_name) {
      return errorResponse(res, "Center name is required", 400);
    }

    const result = await createCenter({
      center_name,
      district,
      village,
      address,
      manager_id: manager_id || null,
    });

    return successResponse(
      res,
      "Anganwadi Center Created Successfully",
      {
        center_id: result.insertId,
      },
      201,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * @desc Get All Centers
 * @route GET /api/centers
 * @access Admin / Manager
 */
const getCenters = async (req, res) => {
  try {
    const centers = await getAllCenters();

    return successResponse(res, "Centers Retrieved Successfully", centers);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * @desc Get Single Center
 * @route GET /api/centers/:id
 * @access Admin / Manager
 */
const getCenter = async (req, res) => {
  try {
    const { id } = req.params;

    const center = await getCenterById(id);

    if (!center) {
      return errorResponse(res, "Center Not Found", 404);
    }

    return successResponse(res, "Center Retrieved Successfully", center);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * @desc Update Center
 * @route PUT /api/centers/:id
 * @access Admin
 */
const editCenter = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCenter = await getCenterById(id);

    if (!existingCenter) {
      return errorResponse(res, "Center Not Found", 404);
    }

    const { center_name, district, village, address, manager_id } = req.body;

    await updateCenter(id, {
      center_name,
      district,
      village,
      address,
      manager_id,
    });

    return successResponse(res, "Center Updated Successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * @desc Delete Center
 * @route DELETE /api/centers/:id
 * @access Admin
 */
const removeCenter = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCenter = await getCenterById(id);

    if (!existingCenter) {
      return errorResponse(res, "Center Not Found", 404);
    }

    await deleteCenter(id);

    return successResponse(res, "Center Deleted Successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  addCenter,
  getCenters,
  getCenter,
  editCenter,
  removeCenter,
};
