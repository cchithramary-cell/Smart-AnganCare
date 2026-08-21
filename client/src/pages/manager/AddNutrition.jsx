import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNutrition } from "../../services/nutritionService";

import "./AddNutrition.css";

function AddNutrition() {
  const navigate = useNavigate();

  const [nutrition, setNutrition] = useState({
    child_id: "",
    weight: "",
    height: "",
    bmi: "",
    nutrition_status: "",
    recorded_date: "",
  });

  const [loading, setLoading] = useState(false);

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return "";

    const heightInMeters = parseFloat(height) / 100;

    if (heightInMeters <= 0) return "";

    return (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedNutrition = {
      ...nutrition,
      [name]: value,
    };

    // Automatically calculate BMI when height or weight changes
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
      setLoading(true);

      await addNutrition(nutrition);

      alert("Nutrition Record Added Successfully");

      navigate("/manager/nutrition");
    } catch (error) {
      console.log("Add Nutrition Error:", error);

      alert(error.response?.data?.message || "Failed to add nutrition record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-nutrition-page">
      <div className="add-nutrition-card">
        {/* Header */}
        <div className="add-nutrition-header">
          <p className="add-nutrition-label">NUTRITION MONITORING</p>

          <h2>Add Nutrition Record</h2>

          <p>
            Record the child's current measurements and nutritional health
            status.
          </p>
        </div>

        {/* Form */}
        <form className="add-nutrition-form" onSubmit={handleSubmit}>
          <div className="add-nutrition-row">
            {/* Child ID */}
            <div className="add-nutrition-group">
              <label>Child ID</label>

              <input
                type="number"
                name="child_id"
                placeholder="Enter Child ID"
                value={nutrition.child_id}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* Recorded Date */}
            <div className="add-nutrition-group">
              <label>Recorded Date</label>

              <input
                type="date"
                name="recorded_date"
                value={nutrition.recorded_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Measurements */}
          <div className="nutrition-measurement-section">
            <div className="nutrition-measurement-header">
              <h3>Health Measurements</h3>

              <p>
                Enter the child's current height and weight. BMI is calculated
                automatically.
              </p>
            </div>

            <div className="nutrition-measurement-grid">
              {/* Weight */}
              <div className="add-nutrition-group">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  name="weight"
                  placeholder="Example: 14.50"
                  step="0.01"
                  min="0.01"
                  value={nutrition.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Height */}
              <div className="add-nutrition-group">
                <label>Height (cm)</label>

                <input
                  type="number"
                  name="height"
                  placeholder="Example: 95.50"
                  step="0.01"
                  min="0.01"
                  value={nutrition.height}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BMI */}
              <div className="add-nutrition-group">
                <label>Calculated BMI</label>

                <input
                  type="text"
                  value={nutrition.bmi || "Calculated automatically"}
                  readOnly
                  className="nutrition-bmi-input"
                />
              </div>
            </div>
          </div>

          {/* Nutrition Status */}
          <div className="add-nutrition-group">
            <label>Nutrition Status</label>

            <select
              name="nutrition_status"
              value={nutrition.nutrition_status}
              onChange={handleChange}
              required
            >
              <option value="">Select Nutrition Status</option>
              <option value="Normal">Normal</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="add-nutrition-actions">
            <button
              type="button"
              className="add-nutrition-cancel"
              onClick={() => navigate("/manager/nutrition")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-nutrition-submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Nutrition Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNutrition;
