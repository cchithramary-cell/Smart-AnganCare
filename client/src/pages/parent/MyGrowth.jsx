import { useEffect, useState } from "react";
import { FaChartLine, FaRulerVertical, FaWeight } from "react-icons/fa";
import { getMyGrowth } from "../../services/parentDashboardService";

import "./MyGrowth.css";

function MyGrowth() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrowth();
  }, []);

  const loadGrowth = async () => {
    try {
      setLoading(true);

      const response = await getMyGrowth();

      setRecords(response.data?.data || []);
    } catch (error) {
      console.error("Load Growth Error:", error);

      alert(error.response?.data?.message || "Unable to Load Growth Records");

      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const getBMIStatus = (bmi) => {
    if (!bmi) return "";

    const value = parseFloat(bmi);

    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal";
    if (value < 30) return "Overweight";

    return "High";
  };

  if (loading) {
    return (
      <div className="growth-page">
        <div className="growth-loading">
          <div className="loading-spinner"></div>
          <p>Loading growth records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="growth-page">
      <div className="growth-header">
        <div>
          <h2>
            <FaChartLine /> My Growth Records
          </h2>

          <p>Track your child's height, weight and BMI progress.</p>
        </div>

        <div className="record-count">
          {records.length} Record{records.length !== 1 ? "s" : ""}
        </div>
      </div>

      {records.length > 0 ? (
        <div className="growth-table-card">
          <div className="table-responsive">
            <table className="growth-table">
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>Month</th>
                  <th>
                    <FaRulerVertical /> Height
                  </th>
                  <th>
                    <FaWeight /> Weight
                  </th>
                  <th>BMI</th>
                  <th>Health Status</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => (
                  <tr key={record.record_id}>
                    <td>
                      <div className="child-name">
                        <div className="child-avatar">
                          {record.child_name?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <span>{record.child_name || "N/A"}</span>
                      </div>
                    </td>

                    <td>{record.month || "N/A"}</td>

                    <td>
                      {record.height !== null && record.height !== undefined ? (
                        <span className="measurement">
                          {record.height} <small>cm</small>
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {record.weight !== null && record.weight !== undefined ? (
                        <span className="measurement">
                          {record.weight} <small>kg</small>
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {record.bmi !== null && record.bmi !== undefined ? (
                        <span className="bmi-value">{record.bmi}</span>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {record.bmi ? (
                        <span
                          className={`bmi-status ${getBMIStatus(
                            record.bmi,
                          ).toLowerCase()}`}
                        >
                          {getBMIStatus(record.bmi)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="growth-empty">
          <FaChartLine className="empty-icon" />
          <h3>No Growth Records Found</h3>
          <p>Growth records for your child will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default MyGrowth;
