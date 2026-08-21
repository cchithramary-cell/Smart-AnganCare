const db = require("../config/db");

// Get All Attendance Records
const getAllAttendanceRecords = async () => {
  const [rows] = await db.query(
    `SELECT *
     FROM attendance
     ORDER BY attendance_date DESC`,
  );

  return rows;
};

// Get Attendance By ID
const getAttendanceRecordById = async (id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM attendance
     WHERE attendance_id = ?`,
    [id],
  );

  return rows[0];
};

// Add Attendance
const createAttendanceRecord = async (attendance) => {
  const { child_id, attendance_date, status, remarks } = attendance;

  const [result] = await db.query(
    `INSERT INTO attendance
    (
      child_id,
      attendance_date,
      status,
      remarks
    )
    VALUES(?,?,?,?)`,
    [child_id, attendance_date, status, remarks],
  );

  return result;
};

// Update Attendance
const updateAttendanceRecord = async (id, attendance) => {
  const { child_id, attendance_date, status, remarks } = attendance;

  const [result] = await db.query(
    `UPDATE attendance
     SET
       child_id=?,
       attendance_date=?,
       status=?,
       remarks=?
     WHERE attendance_id=?`,
    [child_id, attendance_date, status, remarks, id],
  );

  return result;
};

// Delete Attendance
const deleteAttendanceRecord = async (id) => {
  const [result] = await db.query(
    `DELETE FROM attendance
     WHERE attendance_id=?`,
    [id],
  );

  return result;
};

module.exports = {
  getAllAttendanceRecords,
  getAttendanceRecordById,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
};
