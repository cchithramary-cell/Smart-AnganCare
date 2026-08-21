import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNutritionById,
  updateNutrition,
} from "../../services/nutritionService";

import "./EditNutrition.css";

function EditNutrition() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nutrition, setNutrition] = useState({
    child_id: "",
    weight: "",
    height: "",
    bmi: "",
    nutrition_status: "",
    recorded_date: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadNutrition();
  }, [id]);

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return "";

    const heightInMeters = parseFloat(height) / 100;
    const weightValue = parseFloat(weight);

    if (heightInMeters <= 0 || weightValue <= 0) return "";

    return (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const loadNutrition = async () => {
    try {
      setLoading(true);

      const res = await getNutritionById(id);
      const data = res.data?.data || res.data;

      setNutrition({
        child_id: data.child_id || "",
        weight: data.weight || "",
        height: data.height || "",
        bmi: data.bmi || "",
        nutrition_status: data.nutrition_status || "",
        recorded_date: data.recorded_date
          ? data.recorded_date.substring(0, 10)
          : "",
      });
    } catch (error) {
      console.error("Load Nutrition Error:", error);

      alert(error.response?.data?.message || "Failed to load nutrition record");

      navigate("/manager/nutrition");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedNutrition = {
      ...nutrition,
      [name]: value,
    };

    if (name === "height" || name === "weight") {
      updatedNutrition.bmi = calculateBMI(
        updatedNutrition.height,
        updatedNutrition.weight,
      );
    }

    setNutrition(updatedNutrition);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateNutrition(id, nutrition);

      alert("Nutrition Updated Successfully");

      navigate("/manager/nutrition");
    } catch (error) {
      console.error("Update Nutrition Error:", error);

      alert(
        error.response?.data?.message || "Failed to update nutrition record",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-nutrition-page">
        <div className="edit-nutrition-loading">
          Loading nutrition record...
        </div>
      </div>
    );
  }

  return (
    <div className="edit-nutrition-page">
      <div className="edit-nutrition-container">
        <div className="edit-nutrition-header">
          <div>
            <p className="edit-nutrition-label">NUTRITION MANAGEMENT</p>

            <h2>Edit Nutrition Record</h2>

            <p>Update the child's nutrition and health measurements.</p>
          </div>

          <button
            type="button"
            className="edit-nutrition-back-btn"
            onClick={() => navigate("/manager/nutrition")}
          >
            ← Back
          </button>
        </div>

        <form className="edit-nutrition-form" onSubmit={handleSubmit}>
          <div className="edit-nutrition-section">
            <h3>Nutrition Information</h3>

            <div className="edit-nutrition-grid">
              <div className="edit-nutrition-group">
                <label>Child ID</label>

                <input
                  type="number"
                  name="child_id"
                  value={nutrition.child_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="edit-nutrition-group">
                <label>Recorded Date</label>

                <input
                  type="date"
                  name="recorded_date"
                  value={nutrition.recorded_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-nutrition-group">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  name="weight"
                  step="0.01"
                  min="0"
                  value={nutrition.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-nutrition-group">
                <label>Height (cm)</label>

                <input
                  type="number"
                  name="height"
                  step="0.01"
                  min="0"
                  value={nutrition.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-nutrition-group">
                <label>BMI</label>

                <input
                  type="text"
                  value={nutrition.bmi}
                  readOnly
                  placeholder="Calculated automatically"
                />
              </div>

              <div className="edit-nutrition-group">
                <label>Nutrition Status</label>

                <select
                  name="nutrition_status"
                  value={nutrition.nutrition_status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Normal">Normal</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>
          </div>

          <div className="edit-nutrition-actions">
            <button
              type="button"
              className="edit-nutrition-cancel-btn"
              onClick={() => navigate("/manager/nutrition")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-nutrition-save-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Nutrition"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNutrition;
