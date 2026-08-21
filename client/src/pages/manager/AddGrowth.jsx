import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGrowthRecord } from "../../services/growthService";

import "./AddGrowth.css";

function AddGrowth() {
  const navigate = useNavigate();

  const [growth, setGrowth] = useState({
    child_id: "",
    month: "",
    height: "",
    weight: "",
    bmi: "",
  });

  const [loading, setLoading] = useState(false);

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return "";

    const h = parseFloat(height) / 100;

    if (h <= 0) return "";

    return (parseFloat(weight) / (h * h)).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedGrowth = {
      ...growth,
      [name]: value,
    };

    if (name === "height" || name === "weight") {
      updatedGrowth.bmi = calculateBMI(
        updatedGrowth.height,
        updatedGrowth.weight,
      );
    }

    setGrowth(updatedGrowth);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addGrowthRecord(growth);

      alert("Growth Record Added Successfully");

      navigate("/manager/growth");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to Add Growth Record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-growth-page">
      <div className="add-growth-card">
        {/* Header */}
        <div className="add-growth-header">
          <p className="add-growth-label">GROWTH MONITORING</p>

          <h2>Add Growth Record</h2>

          <p>
            Record the child's height and weight. BMI will be calculated
            automatically.
          </p>
        </div>

        {/* Form */}
        <form className="add-growth-form" onSubmit={handleSubmit}>
          <div className="add-growth-row">
            {/* Child ID */}
            <div className="add-growth-group">
              <label>Child ID</label>

              <input
                type="number"
                name="child_id"
                value={growth.child_id}
                onChange={handleChange}
                placeholder="Enter Child ID"
                min="1"
                required
              />
            </div>

            {/* Month */}
            <div className="add-growth-group">
              <label>Month</label>

              <input
                type="text"
                name="month"
                placeholder="Example: July 2026"
                value={growth.month}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Measurements */}
          <div className="measurement-section">
            <div className="measurement-header">
              <h3>Growth Measurements</h3>

              <p>Enter the latest measurements of the child.</p>
            </div>

            <div className="add-growth-row measurement-row">
              {/* Height */}
              <div className="add-growth-group">
                <label>Height (cm)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="height"
                  placeholder="Example: 95.50"
                  value={growth.height}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Weight */}
              <div className="add-growth-group">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="weight"
                  placeholder="Example: 14.50"
                  value={growth.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BMI */}
              <div className="add-growth-group">
                <label>Calculated BMI</label>

                <input
                  type="text"
                  value={growth.bmi || "Calculated automatically"}
                  readOnly
                  className="bmi-input"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="add-growth-actions">
            <button
              type="button"
              className="add-growth-cancel"
              onClick={() => navigate("/manager/growth")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-growth-submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Growth Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGrowth;
