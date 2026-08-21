import { useEffect, useState } from "react";
import {
  FaAppleAlt,
  FaRulerVertical,
  FaWeight,
  FaCalendarAlt,
} from "react-icons/fa";
import { getMyNutrition } from "../../services/parentDashboardService";

import "./MyNutrition.css";

function MyNutrition() {
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNutrition();
  }, []);

  const loadNutrition = async () => {
    try {
      setLoading(true);

      const response = await getMyNutrition();

      setNutrition(response.data?.data || []);
    } catch (error) {
      console.error("Load Nutrition Error:", error);

      alert(
        error.response?.data?.message || "Unable to Load Nutrition Records",
      );

      setNutrition([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    if (!status) return "";

    const value = status.toLowerCase();

    if (value === "normal") return "normal";
    if (value === "moderate") return "moderate";
    if (value === "severe") return "severe";

    return "";
  };

  if (loading) {
    return (
      <div className="nutrition-page">
        <div className="nutrition-loading">
          <div className="loading-spinner"></div>
          <p>Loading nutrition records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nutrition-page">
      <div className="nutrition-header">
        <div>
          <h2>
            <FaAppleAlt /> My Nutrition Records
          </h2>

          <p>
            Monitor your child's nutrition, height, weight and health status.
          </p>
        </div>

        <div className="nutrition-count">
          {nutrition.length} Record{nutrition.length !== 1 ? "s" : ""}
        </div>
      </div>

      {nutrition.length > 0 ? (
        <div className="nutrition-table-card">
          <div className="table-responsive">
            <table className="nutrition-table">
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>
                    <FaCalendarAlt /> Recorded Date
                  </th>
                  <th>
                    <FaRulerVertical /> Height
                  </th>
                  <th>
                    <FaWeight /> Weight
                  </th>
                  <th>BMI</th>
                  <th>Nutrition Status</th>
                </tr>
              </thead>

              <tbody>
                {nutrition.map((item) => (
                  <tr key={item.nutrition_id}>
                    <td>
                      <div className="nutrition-child">
                        <div className="nutrition-avatar">
                          {item.child_name?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <span>{item.child_name || "N/A"}</span>
                      </div>
                    </td>

                    <td>{formatDate(item.recorded_date)}</td>

                    <td>
                      {item.height !== null && item.height !== undefined ? (
                        <span className="nutrition-measurement">
                          {item.height} <small>cm</small>
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {item.weight !== null && item.weight !== undefined ? (
                        <span className="nutrition-measurement">
                          {item.weight} <small>kg</small>
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {item.bmi !== null && item.bmi !== undefined ? (
                        <span className="nutrition-bmi">{item.bmi}</span>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      <span
                        className={`nutrition-status ${getStatusClass(
                          item.nutrition_status,
                        )}`}
                      >
                        {item.nutrition_status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="nutrition-empty">
          <FaAppleAlt className="nutrition-empty-icon" />
          <h3>No Nutrition Records Found</h3>
          <p>Nutrition records for your child will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default MyNutrition;
