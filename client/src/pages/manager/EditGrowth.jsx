import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGrowthRecord,
  updateGrowthRecord,
} from "../../services/growthService";

import "./EditGrowth.css";

function EditGrowth() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [growth, setGrowth] = useState({
    child_id: "",
    month: "",
    height: "",
    weight: "",
    bmi: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadGrowthRecord();
  }, [id]);

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return "";

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (h <= 0 || w <= 0) return "";

    return (w / (h * h)).toFixed(2);
  };

  const loadGrowthRecord = async () => {
    try {
      setLoading(true);

      const response = await getGrowthRecord(id);
      const data = response.data?.data || response.data;

      setGrowth({
        child_id: data.child_id || "",
        month: data.month || "",
        height: data.height || "",
        weight: data.weight || "",
        bmi: data.bmi || "",
      });
    } catch (error) {
      console.error("Load growth record error:", error);

      alert(error.response?.data?.message || "Failed to Load Growth Record");

      navigate("/manager/growth");
    } finally {
      setLoading(false);
    }
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
      setSaving(true);

      await updateGrowthRecord(id, growth);

      alert("Growth Record Updated Successfully");

      navigate("/manager/growth");
    } catch (error) {
      console.error("Update growth record error:", error);

      alert(error.response?.data?.message || "Failed to Update Growth Record");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-growth-page">
        <div className="edit-growth-loading">Loading growth record...</div>
      </div>
    );
  }

  return (
    <div className="edit-growth-page">
      <div className="edit-growth-container">
        <div className="edit-growth-header">
          <div>
            <p className="edit-growth-label">GROWTH MONITORING</p>

            <h2>Edit Growth Record</h2>

            <p>Update the child's height and weight information.</p>
          </div>

          <button
            type="button"
            className="edit-growth-back-btn"
            onClick={() => navigate("/manager/growth")}
          >
            ← Back
          </button>
        </div>

        <form className="edit-growth-form" onSubmit={handleSubmit}>
          <div className="edit-growth-section">
            <h3>Growth Information</h3>

            <div className="edit-growth-grid">
              <div className="edit-growth-group">
                <label>Child ID</label>

                <input
                  type="number"
                  name="child_id"
                  value={growth.child_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="edit-growth-group">
                <label>Month</label>

                <input
                  type="text"
                  name="month"
                  value={growth.month}
                  onChange={handleChange}
                  placeholder="Example: July 2026"
                  required
                />
              </div>

              <div className="edit-growth-group">
                <label>Height (cm)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="height"
                  value={growth.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-growth-group">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="weight"
                  value={growth.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-growth-group edit-growth-bmi">
                <label>BMI</label>

                <input
                  type="text"
                  value={growth.bmi}
                  readOnly
                  placeholder="Calculated automatically"
                />
              </div>
            </div>
          </div>

          <div className="edit-growth-actions">
            <button
              type="button"
              className="edit-growth-cancel-btn"
              onClick={() => navigate("/manager/growth")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-growth-save-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Growth Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGrowth;
