const db = require("../config/db");

// ===============================
// Parent Dashboard
// ===============================
const getDashboard = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      c.child_id,
      c.child_name,
      c.gender,
      c.dob,
      TIMESTAMPDIFF(YEAR, c.dob, CURDATE()) AS age,

      ac.center_id,
      ac.center_name,

      (
        SELECT gr.height
        FROM growth_records gr
        WHERE gr.child_id = c.child_id
        ORDER BY gr.record_id DESC
        LIMIT 1
      ) AS height,

      (
        SELECT gr.weight
        FROM growth_records gr
        WHERE gr.child_id = c.child_id
        ORDER BY gr.record_id DESC
        LIMIT 1
      ) AS weight,

      (
        SELECT a.status
        FROM attendance a
        WHERE a.child_id = c.child_id
        ORDER BY a.attendance_date DESC
        LIMIT 1
      ) AS attendance,

      (
        SELECT v.vaccine_name
        FROM vaccinations v
        WHERE v.child_id = c.child_id
          AND v.status = 'Pending'
        ORDER BY v.due_date ASC
        LIMIT 1
      ) AS next_vaccination

    FROM parents p

    JOIN children c
      ON p.parent_id = c.parent_id

    LEFT JOIN anganwadi_centers ac
      ON c.center_id = ac.center_id

    WHERE p.user_id = ?
    ORDER BY c.child_id ASC
    `,
    [userId],
  );

  return rows;
};

// ===============================
// My Child Details
// ===============================
const getMyChild = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      c.*,

      p.parent_id,
      p.father_name,
      p.mother_name,
      p.guardian_name,
      p.relationship,
      p.address,
      p.occupation,

      ac.center_name,
      ac.district,
      ac.village,
      ac.address AS center_address

    FROM parents p

    JOIN children c
      ON p.parent_id = c.parent_id

    LEFT JOIN anganwadi_centers ac
      ON c.center_id = ac.center_id

    WHERE p.user_id = ?

    ORDER BY c.child_id ASC
    `,
    [userId],
  );

  return rows;
};

// ===============================
// Growth History
// ===============================
const getMyGrowth = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      gr.*,
      c.child_name

    FROM parents p

    JOIN children c
      ON p.parent_id = c.parent_id

    JOIN growth_records gr
      ON c.child_id = gr.child_id

    WHERE p.user_id = ?

    ORDER BY gr.record_id DESC
    `,
    [userId],
  );

  return rows;
};

// ===============================
// Attendance History
// ===============================
const getMyAttendance = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      a.*,
      c.child_name

    FROM parents p

    JOIN children c
      ON p.parent_id = c.parent_id

    JOIN attendance a
      ON c.child_id = a.child_id

    WHERE p.user_id = ?

    ORDER BY a.attendance_date DESC
    `,
    [userId],
  );

  return rows;
};

// ===============================
// Nutrition History
// ===============================
const getMyNutrition = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      n.*,
      c.child_name

    FROM parents p

    JOIN children c
      ON p.parent_id = c.parent_id

    JOIN nutrition n
      ON c.child_id = n.child_id

    WHERE p.user_id = ?

    ORDER BY n.recorded_date DESC
    `,
    [userId],
  );

  return rows;
};

// ===============================
// Vaccination History
// ===============================
const getMyVaccination = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      v.*,
      c.child_name

    FROM parents p

    JOIN children c
      ON p.parent_id = c.parent_id

    JOIN vaccinations v
      ON c.child_id = v.child_id

    WHERE p.user_id = ?

    ORDER BY v.due_date DESC
    `,
    [userId],
  );

  return rows;
};

module.exports = {
  getDashboard,
  getMyChild,
  getMyGrowth,
  getMyAttendance,
  getMyNutrition,
  getMyVaccination,
};
