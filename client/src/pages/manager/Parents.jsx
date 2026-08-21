import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParents, deleteParent } from "../../services/parentService";

import "./Parents.css";

function Parents() {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadParents = async () => {
    try {
      setLoading(true);

      const res = await getParents();

      setParents(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error loading parents:", error);
      setParents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchParents = async () => {
      try {
        setLoading(true);

        const res = await getParents();

        if (!mounted) return;

        setParents(res.data?.data || res.data || []);
      } catch (error) {
        console.error("Error loading parents:", error);

        if (mounted) setParents([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchParents();

    return () => {
      mounted = false;
    };
  }, []);

  const removeParent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this parent?",
    );

    if (!confirmDelete) return;

    try {
      await deleteParent(id);

      alert("Parent Deleted Successfully");

      loadParents();
    } catch (error) {
      console.error("Error deleting parent:", error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const filteredParents = parents.filter((parent) => {
    const searchText = `
      ${parent.parent_id || ""}
      ${parent.father_name || ""}
      ${parent.mother_name || ""}
      ${parent.phone || ""}
      ${parent.email || ""}
      ${parent.occupation || ""}
    `.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="parents-page">
        <div className="loading-message">Loading parents...</div>
      </div>
    );
  }

  return (
    <div className="parents-page">
      <div className="page-header">
        <div>
          <h2>Parent Management</h2>
          <p>Manage parent and guardian information.</p>
        </div>

        <Link to="/manager/add-parent" className="add-btn">
          + Add Parent
        </Link>
      </div>

      <div className="parents-card">
        <div className="table-toolbar">
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <span className="record-count">
            {filteredParents.length} Parent
            {filteredParents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-container">
          <table className="parents-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Occupation</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredParents.length > 0 ? (
                filteredParents.map((parent) => (
                  <tr key={parent.parent_id}>
                    <td>{parent.parent_id}</td>
                    <td>{parent.father_name || "-"}</td>
                    <td>{parent.mother_name || "-"}</td>
                    <td>{parent.phone || "-"}</td>
                    <td>{parent.email || "-"}</td>
                    <td>{parent.occupation || "-"}</td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/manager/view-parent/${parent.parent_id}`}
                          className="view-btn"
                        >
                          View
                        </Link>

                        <Link
                          to={`/manager/edit-parent/${parent.parent_id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() => removeParent(parent.parent_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No Parents Found
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

export default Parents;
