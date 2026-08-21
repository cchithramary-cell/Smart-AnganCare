const {
  getAllAttendanceRecords,
  getAttendanceRecordById,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
} = require("../models/attendanceModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");

// Get All Attendance
const getAttendanceRecords = async (req, res) => {
  try {
    const records = await getAllAttendanceRecords();

    successResponse(res, "Attendance Records Loaded Successfully", records);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Get Attendance By ID
const getAttendanceRecord = async (req, res) => {
  try {
    const record = await getAttendanceRecordById(req.params.id);

    if (!record) {
      return errorResponse(res, "Attendance Record Not Found", 404);
    }

    successResponse(res, "Attendance Record Loaded Successfully", record);
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Add Attendance
const addAttendanceRecord = async (req, res) => {
  try {
    const { child_id, attendance_date, status, remarks } = req.body;

    const result = await createAttendanceRecord({
      child_id,
      attendance_date,
      status,
      remarks,
    });

    successResponse(
      res,
      "Attendance Added Successfully",
      {
        attendance_id: result.insertId,
      },
      201,
    );
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Update Attendance
const editAttendanceRecord = async (req, res) => {
  try {
    const { child_id, attendance_date, status, remarks } = req.body;

    await updateAttendanceRecord(req.params.id, {
      child_id,
      attendance_date,
      status,
      remarks,
    });

    successResponse(res, "Attendance Updated Successfully");
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

// Delete Attendance
const removeAttendanceRecord = async (req, res) => {
  try {
    await deleteAttendanceRecord(req.params.id);

    successResponse(res, "Attendance Deleted Successfully");
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAttendanceRecords,
  getAttendanceRecord,
  addAttendanceRecord,
  editAttendanceRecord,
  removeAttendanceRecord,
};
