import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAttendanceRecord } from "../../services/attendanceService";

import "./AddAttendance.css";

function AddAttendance() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    child_id: "",
    attendance_date: "",
    status: "Present",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addAttendanceRecord(attendance);

      alert("Attendance Added Successfully");

      navigate("/manager/attendance");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to Add Attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-form-page">
      <div className="attendance-form-card">
        {/* Header */}
        <div className="attendance-form-header">
          <p className="attendance-form-label">ATTENDANCE MANAGEMENT</p>

          <h2>Add Attendance</h2>

          <p>Record and manage a child's daily attendance information.</p>
        </div>

        {/* Form */}
        <form className="attendance-form" onSubmit={handleSubmit}>
          <div className="attendance-form-group">
            <label>Child ID</label>

            <input
              type="number"
              name="child_id"
              value={attendance.child_id}
              onChange={handleChange}
              placeholder="Enter Child ID"
              min="1"
              required
            />
          </div>

          <div className="attendance-form-group">
            <label>Attendance Date</label>

            <input
              type="date"
              name="attendance_date"
              value={attendance.attendance_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-form-group">
            <label>Status</label>

            <select
              name="status"
              value={attendance.status}
              onChange={handleChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="attendance-form-group">
            <label>Remarks</label>

            <textarea
              name="remarks"
              rows="5"
              value={attendance.remarks}
              onChange={handleChange}
              placeholder="Enter any additional remarks (optional)"
            />
          </div>

          {/* Actions */}
          <div className="attendance-form-actions">
            <button
              type="button"
              className="attendance-cancel-btn"
              onClick={() => navigate("/manager/attendance")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="attendance-submit-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAttendance;
