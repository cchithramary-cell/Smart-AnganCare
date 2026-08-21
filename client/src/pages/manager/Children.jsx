import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChildren, deleteChild } from "../../services/childService";

import "./Children.css";

function Children() {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      setLoading(true);

      const res = await getChildren();

      setChildren(res.data?.data || []);
    } catch (error) {
      console.error("Load children error:", error);
      alert(error.response?.data?.message || "Unable to load children");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this child?",
    );

    if (!confirmDelete) return;

    try {
      await deleteChild(id);

      alert("Child Deleted Successfully");

      loadChildren();
    } catch (error) {
      console.error("Delete child error:", error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredChildren = children.filter((child) => {
    const searchText = search.toLowerCase();

    return (
      child.child_id?.toString().includes(searchText) ||
      child.child_name?.toLowerCase().includes(searchText) ||
      child.gender?.toLowerCase().includes(searchText) ||
      child.center_name?.toLowerCase().includes(searchText) ||
      child.father_name?.toLowerCase().includes(searchText) ||
      child.mother_name?.toLowerCase().includes(searchText) ||
      child.status?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="children-page">
      <div className="children-header">
        <div>
          <p className="page-label">MANAGEMENT</p>

          <h1>Children Management</h1>

          <p className="page-description">
            Manage children's details, health information, and center records.
          </p>
        </div>

        <Link to="/manager/add-child" className="add-child-btn">
          + Add Child
        </Link>
      </div>

      <div className="children-card">
        <div className="children-toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by name, ID, center or parent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="record-count">
            {filteredChildren.length} Child
            {filteredChildren.length !== 1 ? "ren" : ""}
          </div>
        </div>

        {loading ? (
          <div className="table-message">Loading children records...</div>
        ) : filteredChildren.length === 0 ? (
          <div className="table-message">
            <h3>No Children Found</h3>
            <p>Try changing your search or add a new child.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="children-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CHILD NAME</th>
                  <th>GENDER</th>
                  <th>DATE OF BIRTH</th>
                  <th>CENTER</th>
                  <th>FATHER</th>
                  <th>MOTHER</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredChildren.map((child) => (
                  <tr key={child.child_id}>
                    <td className="id-cell">#{child.child_id}</td>

                    <td>
                      <div className="child-name-cell">
                        <div className="child-avatar">
                          {child.child_name?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <span>{child.child_name}</span>
                      </div>
                    </td>

                    <td>{child.gender || "-"}</td>

                    <td>{formatDate(child.dob)}</td>

                    <td>{child.center_name || "-"}</td>

                    <td>{child.father_name || "-"}</td>

                    <td>{child.mother_name || "-"}</td>

                    <td>
                      <span
                        className={
                          child.status?.toLowerCase() === "active"
                            ? "status-badge active"
                            : "status-badge inactive"
                        }
                      >
                        {child.status || "-"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/manager/edit-child/${child.child_id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(child.child_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Children;
