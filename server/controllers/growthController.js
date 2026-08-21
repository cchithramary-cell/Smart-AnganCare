const {
  getAllGrowthRecords,
  getGrowthRecordById,
  createGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
} = require("../models/growthModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");

// Get All Growth Records
const getGrowthRecords = async (req, res) => {
  try {
    const records = await getAllGrowthRecords();

    successResponse(res, "Growth Records Loaded Successfully", records);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Get Single Growth Record
const getGrowthRecord = async (req, res) => {
  try {
    const record = await getGrowthRecordById(req.params.id);

    if (!record) {
      return errorResponse(res, "Growth Record Not Found", 404);
    }

    successResponse(res, "Growth Record Loaded Successfully", record);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Add Growth Record
const addGrowthRecord = async (req, res) => {
  try {
    const { child_id, month, height, weight, bmi } = req.body;

    const result = await createGrowthRecord({
      child_id,
      month,
      height,
      weight,
      bmi,
    });

    successResponse(
      res,
      "Growth Record Added Successfully",
      {
        record_id: result.insertId,
      },
      201,
    );
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Update Growth Record
const editGrowthRecord = async (req, res) => {
  try {
    const { child_id, month, height, weight, bmi } = req.body;

    await updateGrowthRecord(req.params.id, {
      child_id,
      month,
      height,
      weight,
      bmi,
    });

    successResponse(res, "Growth Record Updated Successfully");
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Delete Growth Record
const removeGrowthRecord = async (req, res) => {
  try {
    await deleteGrowthRecord(req.params.id);

    successResponse(res, "Growth Record Deleted Successfully");
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getGrowthRecords,
  getGrowthRecord,
  addGrowthRecord,
  editGrowthRecord,
  removeGrowthRecord,
};
