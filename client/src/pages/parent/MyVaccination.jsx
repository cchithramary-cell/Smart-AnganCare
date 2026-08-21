import { useEffect, useState } from "react";
import { FaSyringe, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { getMyVaccination } from "../../services/parentDashboardService";

import "./MyVaccination.css";

function MyVaccination() {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVaccinations();
  }, []);

  const loadVaccinations = async () => {
    try {
      setLoading(true);

      const response = await getMyVaccination();

      setVaccinations(response.data?.data || []);
    } catch (error) {
      console.error("Load Vaccination Error:", error);

      alert(
        error.response?.data?.message || "Unable to Load Vaccination Records",
      );

      setVaccinations([]);
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

    if (value === "completed") return "completed";
    if (value === "pending") return "pending";

    return "";
  };

  if (loading) {
    return (
      <div className="vaccination-page">
        <div className="vaccination-loading">
          <div className="loading-spinner"></div>
          <p>Loading vaccination records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vaccination-page">
      <div className="vaccination-header">
        <div>
          <h2>
            <FaSyringe /> My Vaccination Records
          </h2>

          <p>Track your child's vaccines, due dates and vaccination status.</p>
        </div>

        <div className="vaccination-count">
          {vaccinations.length} Record
          {vaccinations.length !== 1 ? "s" : ""}
        </div>
      </div>

      {vaccinations.length > 0 ? (
        <div className="vaccination-table-card">
          <div className="table-responsive">
            <table className="vaccination-table">
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>
                    <FaSyringe /> Vaccine Name
                  </th>
                  <th>
                    <FaCalendarAlt /> Due Date
                  </th>
                  <th>
                    <FaCheckCircle /> Vaccination Date
                  </th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {vaccinations.map((item) => (
                  <tr key={item.vaccination_id}>
                    <td>
                      <div className="vaccination-child">
                        <div className="vaccination-avatar">
                          {item.child_name?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <span>{item.child_name || "N/A"}</span>
                      </div>
                    </td>

                    <td>
                      <span className="vaccine-name">
                        {item.vaccine_name || "N/A"}
                      </span>
                    </td>

                    <td>{formatDate(item.due_date)}</td>

                    <td>{formatDate(item.vaccination_date)}</td>

                    <td>
                      <span
                        className={`vaccination-status ${getStatusClass(
                          item.status,
                        )}`}
                      >
                        {item.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="vaccination-empty">
          <FaSyringe className="vaccination-empty-icon" />

          <h3>No Vaccination Records Found</h3>

          <p>Vaccination records for your child will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default MyVaccination;
