import { useEffect, useState } from "react";
import { getMyAttendance } from "../../services/parentDashboardService";

import "./MyAttendance.css";

function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const response = await getMyAttendance();

      console.log("My Attendance:", response.data);

      setAttendance(response.data?.data || []);
    } catch (error) {
      console.error("Load Attendance Error:", error);

      alert(
        error.response?.data?.message || "Unable to Load Attendance Records",
      );

      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="my-attendance-page">
        <div className="attendance-loading">
          <div className="loading-spinner"></div>
          <p>Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-attendance-page">
      {/* Header */}
      <div className="my-attendance-header">
        <p className="page-label">CHILD RECORDS</p>

        <h2>My Child's Attendance</h2>

        <p>View your child's daily attendance records and remarks.</p>
      </div>

      {/* Attendance Records */}
      {attendance.length > 0 ? (
        <div className="attendance-table-container">
          <div className="attendance-table-header">
            <h3>Attendance History</h3>
            <p>
              {attendance.length} attendance record
              {attendance.length !== 1 ? "s" : ""} found.
            </p>
          </div>

          <div className="table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>CHILD NAME</th>
                  <th>ATTENDANCE DATE</th>
                  <th>STATUS</th>
                  <th>REMARKS</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item) => (
                  <tr key={item.attendance_id}>
                    {/* Child Name */}
                    <td>
                      <div className="child-name">
                        <div className="child-avatar">
                          {item.child_name?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <span>{item.child_name || "N/A"}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td>{formatDate(item.attendance_date)}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`attendance-status ${
                          item.status?.toLowerCase() === "present"
                            ? "present"
                            : "absent"
                        }`}
                      >
                        {item.status || "N/A"}
                      </span>
                    </td>

                    {/* Remarks */}
                    <td className="remarks-cell">{item.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="no-records">
          <div className="no-records-icon">📅</div>

          <h3>No Attendance Records Found</h3>

          <p>
            There are currently no attendance records available for your child.
          </p>
        </div>
      )}
    </div>
  );
}

export default MyAttendance;
