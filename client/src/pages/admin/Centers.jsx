import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import { getCenters, deleteCenter } from "../../services/centerService";

import "./Centers.css";

function Centers() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    try {
      setLoading(true);

      const res = await getCenters();

      setCenters(res.data?.data || []);
    } catch (err) {
      console.error("Load Centers Error:", err);
      alert("Failed to load centers");
    } finally {
      setLoading(false);
    }
  };

  const removeCenter = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this center?",
    );

    if (!confirmed) return;

    try {
      await deleteCenter(id);

      setCenters((prevCenters) =>
        prevCenters.filter((center) => center.center_id !== id),
      );

      alert("Center deleted successfully");
    } catch (err) {
      console.error("Delete Center Error:", err);

      alert(err.response?.data?.message || "Failed to delete center");
    }
  };

  const filteredCenters = centers.filter((center) => {
    const searchableText = `
      ${center.center_name || ""}
      ${center.district || ""}
      ${center.village || ""}
    `.toLowerCase();

    return searchableText.includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="centers-loading">
        <div className="centers-loader"></div>
        <p>Loading Centers...</p>
      </div>
    );
  }

  return (
    <div className="centers-page">
      {/* HEADER */}
      <div className="centers-header">
        <div>
          <p className="centers-label">CENTER MANAGEMENT</p>
          <h1>Anganwadi Centers</h1>
          <p className="centers-description">
            Manage and monitor all registered Anganwadi centers.
          </p>
        </div>

        <Link to="/admin/add-center" className="add-center-btn">
          <FaPlus />
          Add Center
        </Link>
      </div>

      {/* CONTENT CARD */}
      <div className="centers-card">
        <div className="centers-card-top">
          <div>
            <h2>All Centers</h2>
            <p>{filteredCenters.length} center(s) found</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name, district or village..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="centers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Center Name</th>
                <th>District</th>
                <th>Village</th>
                <th className="action-column">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <tr key={center.center_id}>
                    <td>#{center.center_id}</td>

                    <td className="center-name">{center.center_name}</td>

                    <td>{center.district}</td>

                    <td>{center.village}</td>

                    <td>
                      <div className="table-actions">
                        <Link
                          to={`/admin/edit-center/${center.center_id}`}
                          className="edit-btn"
                          title="Edit Center"
                        >
                          <FaEdit />
                          Edit
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() => removeCenter(center.center_id)}
                          title="Delete Center"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No centers found.
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

export default Centers;
