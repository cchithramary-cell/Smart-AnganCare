import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getGrowthRecords,
  deleteGrowthRecord,
} from "../../services/growthService";

import "./Growth.css";

function Growth() {
  const [growthRecords, setGrowthRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrowthRecords();
  }, []);

  const loadGrowthRecords = async () => {
    try {
      setLoading(true);

      const response = await getGrowthRecords();

      setGrowthRecords(response.data?.data || []);
    } catch (error) {
      console.error("Growth Records Error:", error);
      alert(error.response?.data?.message || "Failed to load growth records");
    } finally {
      setLoading(false);
    }
  };

  const removeRecord = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this growth record?",
    );

    if (!confirmDelete) return;

    try {
      await deleteGrowthRecord(id);

      alert("Growth Record Deleted Successfully");

      loadGrowthRecords();
    } catch (error) {
      console.error("Delete Growth Error:", error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const filteredRecords = growthRecords.filter((record) => {
    const searchValue = search.toLowerCase();

    return (
      String(record.child_id || "").includes(search) ||
      String(record.month || "")
        .toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="growth-page">
      <div className="growth-header">
        <div>
          <h2>Growth Records</h2>
          <p>Track and manage children's height, weight, and BMI records.</p>
        </div>

        <Link to="/manager/add-growth" className="add-growth-link">
          <button className="add-growth-btn">+ Add Growth Record</button>
        </Link>
      </div>

      <div className="growth-content-card">
        <div className="growth-toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by Child ID or Month..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <span className="record-count">
            {filteredRecords.length} Record
            {filteredRecords.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="growth-table-wrapper">
          {loading ? (
            <div className="growth-loading">Loading growth records...</div>
          ) : (
            <table className="growth-table">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Child ID</th>
                  <th>Month</th>
                  <th>Height (cm)</th>
                  <th>Weight (kg)</th>
                  <th>BMI</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.record_id}>
                      <td>{record.record_id}</td>
                      <td>{record.child_id}</td>
                      <td>{record.month || "-"}</td>
                      <td>{record.height || "-"}</td>
                      <td>{record.weight || "-"}</td>
                      <td>
                        <span className="bmi-badge">{record.bmi || "-"}</span>
                      </td>

                      <td>
                        <div className="growth-actions">
                          <Link to={`/manager/edit-growth/${record.record_id}`}>
                            <button className="edit-growth-btn">Edit</button>
                          </Link>

                          <button
                            className="delete-growth-btn"
                            onClick={() => removeRecord(record.record_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-growth-records">
                      No Growth Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Growth;
