import { useState } from "react";
import {
  getChildReport,
  getGrowthReport,
  getAttendanceReport,
  getNutritionReport,
  getVaccinationReport,
} from "../../services/reportService";

import "./Reports.css";

function Reports() {
  const [childId, setChildId] = useState("");
  const [report, setReport] = useState([]);
  const [reportType, setReportType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getReportData = () => {
    if (Array.isArray(report)) return report;

    if (report && typeof report === "object") return [report];

    return [];
  };

  const loadReport = async (type) => {
    if (!childId || Number(childId) <= 0) {
      setError("Please enter a valid Child ID.");
      setReport([]);
      setReportType("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReport([]);
      setReportType(type);

      let response;

      switch (type) {
        case "child":
          response = await getChildReport(childId);
          break;

        case "growth":
          response = await getGrowthReport(childId);
          break;

        case "attendance":
          response = await getAttendanceReport(childId);
          break;

        case "nutrition":
          response = await getNutritionReport(childId);
          break;

        case "vaccination":
          response = await getVaccinationReport(childId);
          break;

        default:
          return;
      }

      const data = response?.data?.data ?? response?.data ?? [];
      setReport(data);
    } catch (error) {
      console.error("Report Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load this report. Please try again.",
      );

      setReport([]);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    const titles = {
      child: "Child Details",
      growth: "Growth Report",
      attendance: "Attendance Report",
      nutrition: "Nutrition Report",
      vaccination: "Vaccination Report",
    };

    return titles[reportType] || "";
  };

  const renderChild = () => {
    const child = Array.isArray(report) ? report[0] : report;

    if (!child || Object.keys(child).length === 0) {
      return <div className="empty-state">No child details found.</div>;
    }

    return (
      <div className="child-profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {child.child_name?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="profile-name">
            <span>Child Profile</span>
            <h3>{child.child_name || "Child Details"}</h3>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-box">
            <span>Child ID</span>
            <strong>#{child.child_id || "-"}</strong>
          </div>

          <div className="detail-box">
            <span>Gender</span>
            <strong>{child.gender || "-"}</strong>
          </div>

          <div className="detail-box">
            <span>Date of Birth</span>
            <strong>{formatDate(child.dob)}</strong>
          </div>

          <div className="detail-box">
            <span>Blood Group</span>
            <strong>{child.blood_group || "-"}</strong>
          </div>

          <div className="detail-box">
            <span>Parent ID</span>
            <strong>#{child.parent_id || "-"}</strong>
          </div>

          <div className="detail-box">
            <span>Center ID</span>
            <strong>#{child.center_id || "-"}</strong>
          </div>
        </div>
      </div>
    );
  };

  const renderGrowth = () => {
    const data = getReportData();

    if (data.length === 0) {
      return <div className="empty-state">No growth records found.</div>;
    }

    return (
      <div className="report-cards-grid">
        {data.map((item, index) => (
          <div
            className="data-card"
            key={item.record_id || item.growth_id || index}
          >
            <div className="data-card-title">
              <h3>Growth Record</h3>
            </div>

            <div className="details-grid">
              <div className="detail-box">
                <span>Height</span>
                <strong>
                  {item.height !== null && item.height !== undefined
                    ? `${item.height} cm`
                    : "-"}
                </strong>
              </div>

              <div className="detail-box">
                <span>Weight</span>
                <strong>
                  {item.weight !== null && item.weight !== undefined
                    ? `${item.weight} kg`
                    : "-"}
                </strong>
              </div>

              <div className="detail-box">
                <span>BMI</span>
                <strong>{item.bmi ?? "-"}</strong>
              </div>

              <div className="detail-box">
                <span>Recorded Date</span>
                <strong>{formatDate(item.recorded_date)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAttendance = () => {
    const data = getReportData();

    if (data.length === 0) {
      return <div className="empty-state">No attendance records found.</div>;
    }

    return (
      <div className="report-cards-grid">
        {data.map((item, index) => (
          <div className="data-card" key={item.attendance_id || index}>
            <div className="data-card-title">
              <h3>Attendance Record</h3>

              <span
                className={`status-badge ${
                  String(item.status).toLowerCase() === "present"
                    ? "present"
                    : "absent"
                }`}
              >
                {item.status || "-"}
              </span>
            </div>

            <div className="details-grid attendance-details">
              <div className="detail-box">
                <span>Date</span>
                <strong>{formatDate(item.attendance_date)}</strong>
              </div>

              <div className="detail-box">
                <span>Remarks</span>
                <strong>{item.remarks || "-"}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNutrition = () => {
    const data = getReportData();

    if (data.length === 0) {
      return <div className="empty-state">No nutrition records found.</div>;
    }

    return (
      <div className="report-cards-grid">
        {data.map((item, index) => (
          <div className="data-card" key={item.nutrition_id || index}>
            <div className="data-card-title">
              <h3>Nutrition Record</h3>
            </div>

            <div className="details-grid">
              <div className="detail-box">
                <span>Recorded Date</span>
                <strong>{formatDate(item.recorded_date)}</strong>
              </div>

              <div className="detail-box">
                <span>Nutrition Status</span>
                <strong>{item.nutrition_status || "-"}</strong>
              </div>

              <div className="detail-box">
                <span>Height</span>
                <strong>
                  {item.height !== null && item.height !== undefined
                    ? `${item.height} cm`
                    : "-"}
                </strong>
              </div>

              <div className="detail-box">
                <span>Weight</span>
                <strong>
                  {item.weight !== null && item.weight !== undefined
                    ? `${item.weight} kg`
                    : "-"}
                </strong>
              </div>

              <div className="detail-box">
                <span>BMI</span>
                <strong>{item.bmi ?? "-"}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderVaccination = () => {
    const data = getReportData();

    if (data.length === 0) {
      return <div className="empty-state">No vaccination records found.</div>;
    }

    return (
      <div className="report-cards-grid">
        {data.map((item, index) => (
          <div className="data-card" key={item.vaccination_id || index}>
            <div className="data-card-title">
              <h3>{item.vaccine_name || "Vaccination Record"}</h3>

              <span
                className={`status-badge ${
                  String(item.status).toLowerCase() === "completed"
                    ? "completed"
                    : "pending"
                }`}
              >
                {item.status || "Pending"}
              </span>
            </div>

            <div className="details-grid">
              <div className="detail-box">
                <span>Child ID</span>
                <strong>#{item.child_id || "-"}</strong>
              </div>

              <div className="detail-box">
                <span>Due Date</span>
                <strong>{formatDate(item.due_date)}</strong>
              </div>

              <div className="detail-box">
                <span>Vaccination Date</span>
                <strong>{formatDate(item.vaccination_date)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderReport = () => {
    switch (reportType) {
      case "child":
        return renderChild();
      case "growth":
        return renderGrowth();
      case "attendance":
        return renderAttendance();
      case "nutrition":
        return renderNutrition();
      case "vaccination":
        return renderVaccination();
      default:
        return null;
    }
  };

  return (
    <div className="reports-container">
      <div className="report-search-card">
        <div className="report-input-group">
          <label htmlFor="childId">Child ID</label>

          <input
            id="childId"
            type="number"
            placeholder="Enter Child ID"
            value={childId}
            min="1"
            onChange={(e) => {
              setChildId(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="report-button-grid">
          <button
            className={
              reportType === "child"
                ? "report-type-btn active"
                : "report-type-btn"
            }
            onClick={() => loadReport("child")}
          >
            Child Details
          </button>

          <button
            className={
              reportType === "growth"
                ? "report-type-btn active"
                : "report-type-btn"
            }
            onClick={() => loadReport("growth")}
          >
            Growth
          </button>

          <button
            className={
              reportType === "attendance"
                ? "report-type-btn active"
                : "report-type-btn"
            }
            onClick={() => loadReport("attendance")}
          >
            Attendance
          </button>

          <button
            className={
              reportType === "nutrition"
                ? "report-type-btn active"
                : "report-type-btn"
            }
            onClick={() => loadReport("nutrition")}
          >
            Nutrition
          </button>

          <button
            className={
              reportType === "vaccination"
                ? "report-type-btn active"
                : "report-type-btn"
            }
            onClick={() => loadReport("vaccination")}
          >
            Vaccination
          </button>
        </div>
      </div>

      <div className="report-area">
        {loading && (
          <div className="loading-state">
            <div className="report-loader"></div>
            <p>Loading report...</p>
          </div>
        )}

        {!loading && error && <div className="error-state">{error}</div>}

        {!loading && !error && reportType && (
          <>
            <h2 className="report-result-title">{getTitle()}</h2>
            {renderReport()}
          </>
        )}
      </div>
    </div>
  );
}

export default Reports;
