import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getVaccinations,
  deleteVaccination,
} from "../../services/vaccinationService";

import "./Vaccinations.css";

function Vaccinations() {
  const [vaccinations, setVaccinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadVaccinations = async () => {
    try {
      setLoading(true);

      const response = await getVaccinations();

      console.log("Vaccination Response:", response.data);

      setVaccinations(response.data?.data || []);
    } catch (error) {
      console.error("Load Vaccinations Error:", error);

      setVaccinations([]);

      alert(
        error.response?.data?.message || "Failed to load vaccination records",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVaccinations();
  }, []);

  const removeVaccination = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vaccination record?",
    );

    if (!confirmDelete) return;

    try {
      await deleteVaccination(id);

      alert("Vaccination Deleted Successfully");

      loadVaccinations();
    } catch (error) {
      console.error("Delete Vaccination Error:", error);

      alert(
        error.response?.data?.message || "Failed to delete vaccination record",
      );
    }
  };

  const filteredVaccinations = vaccinations.filter((record) => {
    const searchValue = search.toLowerCase();

    return (
      record.child_id?.toString().includes(searchValue) ||
      record.child_name?.toLowerCase().includes(searchValue) ||
      record.vaccine_name?.toLowerCase().includes(searchValue) ||
      record.status?.toLowerCase().includes(searchValue)
    );
  });

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="vaccinations-page">
        <div className="loading-message">Loading vaccination records...</div>
      </div>
    );
  }

  return (
    <div className="vaccinations-page">
      <div className="page-header">
        <div>
          <h2>Vaccination Management</h2>
          <p>Manage children's vaccination schedules and records.</p>
        </div>

        <Link to="/manager/add-vaccination" className="add-btn">
          + Add Vaccination
        </Link>
      </div>

      <div className="vaccinations-card">
        <div className="table-toolbar">
          <input
            type="text"
            placeholder="Search by Child, Vaccine or Status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <span className="record-count">
            {filteredVaccinations.length} Record
            {filteredVaccinations.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-container">
          <table className="vaccinations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Child ID</th>
                <th>Child Name</th>
                <th>Vaccine</th>
                <th>Due Date</th>
                <th>Vaccination Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVaccinations.length > 0 ? (
                filteredVaccinations.map((record) => (
                  <tr key={record.vaccination_id}>
                    <td>{record.vaccination_id}</td>
                    <td>{record.child_id}</td>
                    <td>{record.child_name || "-"}</td>
                    <td>{record.vaccine_name}</td>
                    <td>{formatDate(record.due_date)}</td>
                    <td>{formatDate(record.vaccination_date)}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          record.status?.toLowerCase() === "completed"
                            ? "completed"
                            : "pending"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/manager/edit-vaccination/${record.vaccination_id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            removeVaccination(record.vaccination_id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No Vaccination Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Vaccinations;
