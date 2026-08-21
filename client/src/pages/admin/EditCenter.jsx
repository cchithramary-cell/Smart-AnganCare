import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCenter, updateCenter } from "../../services/centerService";

import "./EditCenter.css";

function EditCenter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState({
    center_name: "",
    district: "",
    village: "",
    address: "",
    manager_id: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadCenter();
  }, [id]);

  const loadCenter = async () => {
    try {
      setLoading(true);

      const res = await getCenter(id);

      setCenter(res.data?.data || {});
    } catch (error) {
      console.error("Load Center Error:", error);

      alert(error.response?.data?.message || "Failed to load center");
    } finally {
      setLoading(false);
    }
  };

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
      setUpdating(true);

      await updateCenter(id, center);

      alert("Center Updated Successfully");

      navigate("/admin/centers");
    } catch (error) {
      console.error("Update Center Error:", error);

      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-center-loading">
        <div className="edit-center-loader"></div>
        <p>Loading Center Details...</p>
      </div>
    );
  }

  return (
    <div className="edit-center-page">
      <div className="edit-center-card">
        {/* HEADER */}
        <div className="edit-center-header">
          <p className="edit-center-label">CENTER MANAGEMENT</p>

          <h2>Edit Anganwadi Center</h2>

          <p>
            Update the information for this Anganwadi center and save your
            changes.
          </p>
        </div>

        {/* FORM */}
        <form className="edit-center-form" onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label htmlFor="center_name">Center Name</label>

            <input
              id="center_name"
              type="text"
              name="center_name"
              value={center.center_name || ""}
              onChange={handleChange}
              placeholder="Enter center name"
              required
            />
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group">
              <label htmlFor="district">District</label>

              <input
                id="district"
                type="text"
                name="district"
                value={center.district || ""}
                onChange={handleChange}
                placeholder="Enter district"
                required
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="village">Village</label>

              <input
                id="village"
                type="text"
                name="village"
                value={center.village || ""}
                onChange={handleChange}
                placeholder="Enter village"
                required
              />
            </div>
          </div>

          <div className="edit-form-group">
            <label htmlFor="address">Address</label>

            <textarea
              id="address"
              name="address"
              value={center.address || ""}
              onChange={handleChange}
              rows="4"
              placeholder="Enter complete center address"
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="manager_id">
              Manager User ID{" "}
              <span className="edit-optional-text">(Optional)</span>
            </label>

            <input
              id="manager_id"
              type="number"
              name="manager_id"
              value={center.manager_id || ""}
              onChange={handleChange}
              placeholder="Enter manager user ID"
              min="1"
            />
          </div>

          <div className="edit-form-actions">
            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() => navigate("/admin/centers")}
              disabled={updating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-submit-btn"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Center"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCenter;
