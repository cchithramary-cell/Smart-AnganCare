import { useEffect, useState } from "react";
import { getMyReports } from "../../services/parentDashboardService";
import "./PReports.css";

function PReports() {
  const [growth, setGrowth] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  // ==========================================
  // LOAD PARENT CHILD REPORTS
  // ==========================================
  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyReports();

      console.log("MY REPORTS RESPONSE:", response);

      // Supports:
      // { success: true, data: { growth: [], vaccinations: [] } }
      // OR
      // { growth: [], vaccinations: [] }

      const responseData = response?.data;
      const reportData = responseData?.data || responseData || {};

      console.log("REPORT DATA:", reportData);

      setGrowth(Array.isArray(reportData.growth) ? reportData.growth : []);

      setVaccinations(
        Array.isArray(reportData.vaccinations) ? reportData.vaccinations : [],
      );
    } catch (error) {
      console.error("ERROR LOADING REPORTS:", error);
      console.error("BACKEND ERROR:", error.response?.data);

      setError(
        error.response?.data?.message || "Unable to load your child's reports.",
      );

      setGrowth([]);
      setVaccinations([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORMAT DATE SAFELY
  // ==========================================
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="reports-page">
        <div className="reports-loading">
          <div className="reports-spinner"></div>
          <p>Loading your child's reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page">
      {/* HEADER */}
      <div className="reports-header">
        <h1>Child Reports</h1>
        <p>View your child's growth and vaccination records.</p>
      </div>

      {/* ERROR */}
      {error && <div className="reports-error">{error}</div>}

      {/* =====================================
          GROWTH REPORT
      ===================================== */}
      <section className="report-section">
        <div className="report-section-header">
          <div className="report-icon">📈</div>

          <div>
            <h2>Growth Report</h2>
            <p>Monitor your child's height, weight and BMI.</p>
          </div>
        </div>

        {growth.length > 0 ? (
          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>Recorded Date</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>BMI</th>
                </tr>
              </thead>

              <tbody>
                {growth.map((record, index) => (
                  <tr key={record.growth_id || record.record_id || index}>
                    <td>{record.child_name || record.name || "-"}</td>

                    <td>
                      {formatDate(
                        record.recorded_date ||
                          record.record_date ||
                          record.month ||
                          record.date,
                      )}
                    </td>

                    <td>
                      {record.height !== null && record.height !== undefined
                        ? `${record.height} cm`
                        : "-"}
                    </td>

                    <td>
                      {record.weight !== null && record.weight !== undefined
                        ? `${record.weight} kg`
                        : "-"}
                    </td>

                    <td>
                      {record.bmi !== null && record.bmi !== undefined
                        ? Number(record.bmi).toFixed(2)
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-report">
            <h3>No Growth Records Found</h3>
            <p>Growth records for your child are not available yet.</p>
          </div>
        )}
      </section>

      {/* =====================================
          VACCINATION REPORT
      ===================================== */}
      <section className="report-section">
        <div className="report-section-header">
          <div className="report-icon">💉</div>

          <div>
            <h2>Vaccination Report</h2>
            <p>View completed and upcoming vaccinations.</p>
          </div>
        </div>

        {vaccinations.length > 0 ? (
          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>Vaccine</th>
                  <th>Due Date</th>
                  <th>Vaccination Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {vaccinations.map((vaccine, index) => (
                  <tr key={vaccine.vaccination_id || vaccine.id || index}>
                    <td>{vaccine.child_name || vaccine.name || "-"}</td>

                    <td>{vaccine.vaccine_name || vaccine.vaccine || "-"}</td>

                    <td>{formatDate(vaccine.due_date)}</td>

                    <td>
                      {formatDate(
                        vaccine.vaccination_date || vaccine.vaccinated_date,
                      )}
                    </td>

                    <td>
                      <span
                        className={`status ${
                          String(vaccine.status).toLowerCase() === "completed"
                            ? "status-completed"
                            : "status-pending"
                        }`}
                      >
                        {vaccine.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-report">
            <h3>No Vaccination Records Found</h3>
            <p>Vaccination records for your child are not available yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default PReports;
