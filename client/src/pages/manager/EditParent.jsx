import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getParent, updateParent } from "../../services/parentService";

import "./EditParent.css";

function EditParent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parent, setParent] = useState({
    user_id: "",
    center_id: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    relationship: "",
    occupation: "",
    annual_income: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadParent();
  }, [id]);

  const loadParent = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getParent(id);
      const data = res.data?.data || res.data;

      if (!data) {
        setError("Parent data not found");
        return;
      }

      setParent({
        user_id: data.user_id || "",
        center_id: data.center_id || "",
        father_name: data.father_name || "",
        mother_name: data.mother_name || "",
        guardian_name: data.guardian_name || "",
        relationship: data.relationship || "",
        occupation: data.occupation || "",
        annual_income: data.annual_income || "",
        address: data.address || "",
      });
    } catch (error) {
      console.error("Error loading parent:", error);

      setError(error.response?.data?.message || "Failed to load parent data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setParent((previousParent) => ({
      ...previousParent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!parent.user_id || !parent.center_id || !parent.mother_name) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      await updateParent(id, parent);

      alert("Parent Updated Successfully");

      navigate("/manager/parents");
    } catch (error) {
      console.error("Update Parent Error:", error);

      const message =
        error.response?.data?.message || "Failed to update parent";

      setError(message);
      alert(message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-parent-page">
        <div className="edit-parent-loading">Loading parent data...</div>
      </div>
    );
  }

  if (error && !parent.user_id) {
    return (
      <div className="edit-parent-page">
        <div className="edit-parent-error-card">
          <h3>Unable to Load Parent</h3>
          <p>{error}</p>

          <button
            className="edit-parent-back-btn"
            onClick={() => navigate("/manager/parents")}
          >
            ← Back to Parents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-parent-page">
      <div className="edit-parent-container">
        <div className="edit-parent-header">
          <div>
            <p className="edit-parent-label">PARENT MANAGEMENT</p>

            <h2>Edit Parent</h2>

            <p>Update parent and guardian information.</p>
          </div>

          <button
            type="button"
            className="edit-parent-back-btn"
            onClick={() => navigate("/manager/parents")}
          >
            ← Back
          </button>
        </div>

        {error && <div className="edit-parent-inline-error">{error}</div>}

        <form className="edit-parent-form" onSubmit={handleSubmit}>
          <div className="edit-parent-section">
            <h3>Parent Information</h3>

            <div className="edit-parent-grid">
              <div className="edit-parent-group">
                <label>
                  User ID <span>*</span>
                </label>

                <input
                  type="number"
                  name="user_id"
                  value={parent.user_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="edit-parent-group">
                <label>
                  Center ID <span>*</span>
                </label>

                <input
                  type="number"
                  name="center_id"
                  value={parent.center_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="edit-parent-group">
                <label>Father Name</label>

                <input
                  type="text"
                  name="father_name"
                  value={parent.father_name}
                  onChange={handleChange}
                  placeholder="Enter father name"
                />
              </div>

              <div className="edit-parent-group">
                <label>
                  Mother Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="mother_name"
                  value={parent.mother_name}
                  onChange={handleChange}
                  placeholder="Enter mother name"
                  required
                />
              </div>

              <div className="edit-parent-group">
                <label>Guardian Name</label>

                <input
                  type="text"
                  name="guardian_name"
                  value={parent.guardian_name}
                  onChange={handleChange}
                  placeholder="Enter guardian name"
                />
              </div>

              <div className="edit-parent-group">
                <label>Relationship</label>

                <input
                  type="text"
                  name="relationship"
                  value={parent.relationship}
                  onChange={handleChange}
                  placeholder="Example: Grandmother"
                />
              </div>

              <div className="edit-parent-group">
                <label>Occupation</label>

                <input
                  type="text"
                  name="occupation"
                  value={parent.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                />
              </div>

              <div className="edit-parent-group">
                <label>Annual Income</label>

                <input
                  type="number"
                  name="annual_income"
                  value={parent.annual_income}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter annual income"
                />
              </div>

              <div className="edit-parent-group edit-parent-address">
                <label>Address</label>

                <textarea
                  name="address"
                  rows="4"
                  value={parent.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                />
              </div>
            </div>
          </div>

          <div className="edit-parent-actions">
            <button
              type="button"
              className="edit-parent-cancel-btn"
              onClick={() => navigate("/manager/parents")}
              disabled={updating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-parent-save-btn"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Parent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditParent;
