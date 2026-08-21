import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNutrition, deleteNutrition } from "../../services/nutritionService";

import "./Nutrition.css";

function Nutrition() {
  const [nutrition, setNutrition] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNutrition();
  }, []);

  const loadNutrition = async () => {
    try {
      const res = await getNutrition();
      console.log("Nutrition Response:", res.data);

      setNutrition(res.data?.data || []);
    } catch (error) {
      console.log("Nutrition Error:", error);
      setNutrition([]);
    }
  };

  const removeNutrition = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this nutrition record?",
    );

    if (!confirmDelete) return;

    try {
      await deleteNutrition(id);

      alert("Nutrition Record Deleted Successfully");
      loadNutrition();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const filteredNutrition = nutrition.filter((item) =>
    `${item.child_id || ""} ${item.nutrition_status || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="nutrition-page">
      <div className="page-header">
        <div>
          <h2>Nutrition Records</h2>
          <p>Manage and monitor children's nutrition records.</p>
        </div>

        <Link to="/manager/add-nutrition" className="add-btn">
          + Add Nutrition
        </Link>
      </div>

      <div className="nutrition-card">
        <div className="table-toolbar">
          <input
            type="text"
            placeholder="Search by Child ID or Status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <span className="record-count">
            {filteredNutrition.length} Record
            {filteredNutrition.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-container">
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Child ID</th>
                <th>Weight (kg)</th>
                <th>Height (cm)</th>
                <th>BMI</th>
                <th>Status</th>
                <th>Recorded Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredNutrition.length > 0 ? (
                filteredNutrition.map((item) => (
                  <tr key={item.nutrition_id}>
                    <td>{item.nutrition_id}</td>
                    <td>{item.child_id}</td>
                    <td>{item.weight}</td>
                    <td>{item.height}</td>
                    <td>{item.bmi}</td>

                    <td>
                      <span
                        className={`status-badge ${item.nutrition_status?.toLowerCase()}`}
                      >
                        {item.nutrition_status}
                      </span>
                    </td>

                    <td>
                      {item.recorded_date
                        ? item.recorded_date.substring(0, 10)
                        : "-"}
                    </td>

                    <td className="action-buttons">
                      <Link
                        to={`/manager/edit-nutrition/${item.nutrition_id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() => removeNutrition(item.nutrition_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No nutrition records found
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

export default Nutrition;
