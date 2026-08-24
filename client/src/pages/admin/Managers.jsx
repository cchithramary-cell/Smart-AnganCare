import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./Managers.css";

function Managers() {
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchManagers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/managers");
      const managerList = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data?.managers)
          ? response.data.managers
          : [];

      setManagers(managerList);
    } catch (err) {
      console.error("Error fetching managers:", err);

      setError(err.response?.data?.message || "Failed to load managers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this manager?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/managers/${id}`);

      alert("Manager deleted successfully");

      fetchManagers();
    } catch (err) {
      console.error("Delete manager error:", err);

      alert(err.response?.data?.message || "Failed to delete manager");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Manager Management</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-manager")}
        >
          + Add Manager
        </button>
      </div>

      {loading && <p>Loading managers...</p>}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && managers.length === 0 && (
        <div className="empty-message">No managers found.</div>
      )}

      {!loading && managers.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {managers.map((manager) => (
                <tr key={manager.user_id}>
                  <td>{manager.user_id}</td>

                  <td>{manager.full_name}</td>

                  <td>{manager.email}</td>

                  <td>{manager.phone || "-"}</td>

                  <td>
                    <span
                      className={
                        manager.status === "active"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {manager.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/edit-manager/${manager.user_id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(manager.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Managers;
