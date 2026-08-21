import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAttendanceRecords,
  deleteAttendanceRecord,
} from "../../services/attendanceService";

import "./Attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const response = await getAttendanceRecords();

      setAttendance(response.data?.data || []);
    } catch (error) {
      console.error("Load attendance error:", error);
      alert(
        error.response?.data?.message || "Unable to load attendance records",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeAttendance = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance record?",
    );

    if (!confirmed) return;

    try {
      await deleteAttendanceRecord(id);

      alert("Attendance deleted successfully");

      loadAttendance();
    } catch (error) {
      console.error("Delete attendance error:", error);

      alert(error.response?.data?.message || "Failed to delete attendance");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredAttendance = attendance.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.child_id?.toString().includes(searchText) ||
      item.status?.toLowerCase().includes(searchText) ||
      item.attendance_date?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div>
          <p className="page-label">MANAGEMENT</p>

          <h1>Attendance Management</h1>

          <p className="page-description">
            Track and manage children's daily attendance records.
          </p>
        </div>

        <Link to="/manager/add-attendance" className="add-attendance-btn">
          + Add Attendance
        </Link>
      </div>

      <div className="attendance-card">
        <div className="attendance-toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by Child ID, Status or Date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="record-count">
            {filteredAttendance.length} Record
            {filteredAttendance.length !== 1 ? "s" : ""}
          </div>
        </div>

        {loading ? (
          <div className="table-message">Loading attendance records...</div>
        ) : filteredAttendance.length === 0 ? (
          <div className="table-message">
            <h3>No Attendance Records Found</h3>

            <p>Try changing your search or add a new attendance record.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CHILD ID</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>REMARKS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredAttendance.map((item) => (
                  <tr key={item.attendance_id}>
                    <td className="id-cell">#{item.attendance_id}</td>

                    <td>
                      <span className="child-id">{item.child_id}</span>
                    </td>

                    <td>{formatDate(item.attendance_date)}</td>

                    <td>
                      <span
                        className={
                          item.status === "Present"
                            ? "status-badge present"
                            : "status-badge absent"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="remarks-cell">{item.remarks || "-"}</td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/manager/edit-attendance/${item.attendance_id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() => removeAttendance(item.attendance_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
