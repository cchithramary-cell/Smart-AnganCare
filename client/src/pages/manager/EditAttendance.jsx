
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAttendanceRecord,
  updateAttendanceRecord,
} from "../../services/attendanceService";

import "./EditAttendance.css";

function EditAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    child_id: "",
    attendance_date: "",
    status: "Present",
    remarks: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, [id]);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const response = await getAttendanceRecord(id);
      const data = response.data?.data || {};

      setAttendance({
        child_id: data.child_id || "",
        attendance_date: data.attendance_date
          ? data.attendance_date.split("T")[0]
          : "",
        status: data.status || "Present",
        remarks: data.remarks || "",
      });
    } catch (error) {
      console.error("Load attendance error:", error);

      alert(
        error.response?.data?.message || "Unable to Load Attendance Record",
      );

      navigate("/manager/attendance");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAttendance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateAttendanceRecord(id, attendance);

      alert("Attendance Updated Successfully");

      navigate("/manager/attendance");
    } catch (error) {
      console.error("Update attendance error:", error);

      alert(
        error.response?.data?.message || "Failed to Update Attendance",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="form-page">
        <div className="form-card">
          <p className="form-loading">Loading attendance record...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <p className="form-label">ATTENDANCE MANAGEMENT</p>

          <h2>Edit Attendance Record</h2>

          <p>
            Update the attendance details and save the changes.
          </p>
        </div>

        <form className="attendance-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
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

            <div className="form-group">
              <label>Attendance Date</label>

              <input
                type="date"
                name="attendance_date"
                value={attendance.attendance_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={attendance.status}
              onChange={handleChange}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="form-group">
            <label>Remarks</label>

            <textarea
              name="remarks"
              rows="5"
              value={attendance.remarks}
              onChange={handleChange}
              placeholder="Enter remarks if any..."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/manager/attendance")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAttendance;

