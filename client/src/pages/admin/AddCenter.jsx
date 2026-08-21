import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCenter } from "../../services/centerService";
import "./AddCenter.css";

function AddCenter() {
  const navigate = useNavigate();

  const [center, setCenter] = useState({
    center_name: "",
    district: "",
    village: "",
    address: "",
    manager_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCenter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addCenter(center);

      alert("Center Added Successfully");

      navigate("/admin/centers");
    } catch (error) {
      console.error("Add Center Error:", error);

      alert(error.response?.data?.message || "Failed to Add Center");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        {/* HEADER */}
        <div className="form-header">
          <p className="form-label">CENTER MANAGEMENT</p>

          <h2>Add Anganwadi Center</h2>

          <p>
            Enter the center details below to register a new Anganwadi center in
            Smart AnganCare.
          </p>
        </div>

        {/* FORM */}
        <form className="center-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="center_name">Center Name</label>

            <input
              id="center_name"
              type="text"
              name="center_name"
              value={center.center_name}
              onChange={handleChange}
              placeholder="Enter center name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="district">District</label>

              <input
                id="district"
                type="text"
                name="district"
                value={center.district}
                onChange={handleChange}
                placeholder="Enter district"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="village">Village</label>

              <input
                id="village"
                type="text"
                name="village"
                value={center.village}
                onChange={handleChange}
                placeholder="Enter village"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>

            <textarea
              id="address"
              name="address"
              value={center.address}
              onChange={handleChange}
              placeholder="Enter complete center address"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="manager_id">
              Manager User ID <span className="optional-text">(Optional)</span>
            </label>

            <input
              id="manager_id"
              type="number"
              name="manager_id"
              value={center.manager_id}
              onChange={handleChange}
              placeholder="Enter manager user ID"
              min="1"
            />
          </div>

          {/* BUTTONS */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/centers")}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding Center..." : "Add Center"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCenter;
