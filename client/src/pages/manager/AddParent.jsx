import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addParent } from "../../services/parentService";

import "./AddParent.css";

function AddParent() {
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setParent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addParent(parent);

      alert("Parent Added Successfully");

      navigate("/manager/parents");
    } catch (error) {
      console.error("Add Parent Error:", error);

      alert(error.response?.data?.message || "Failed to add parent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-parent-page">
      <div className="add-parent-card">
        {/* Header */}
        <div className="add-parent-header">
          <p className="add-parent-label">PARENT MANAGEMENT</p>

          <h2>Add Parent</h2>

          <p>
            Add parent or guardian details and associate them with an Anganwadi
            center.
          </p>
        </div>

        <form className="add-parent-form" onSubmit={handleSubmit}>
          {/* Account Information */}
          <div className="parent-section">
            <div className="parent-section-header">
              <h3>Account Information</h3>
              <p>Enter the user and center details.</p>
            </div>

            <div className="add-parent-row">
              <div className="add-parent-group">
                <label>User ID</label>

                <input
                  type="number"
                  name="user_id"
                  value={parent.user_id}
                  onChange={handleChange}
                  placeholder="Enter User ID"
                  min="1"
                  required
                />
              </div>

              <div className="add-parent-group">
                <label>Center ID</label>

                <input
                  type="number"
                  name="center_id"
                  value={parent.center_id}
                  onChange={handleChange}
                  placeholder="Enter Center ID"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="parent-section">
            <div className="parent-section-header">
              <h3>Family Information</h3>
              <p>Enter parent and guardian details.</p>
            </div>

            <div className="add-parent-row">
              <div className="add-parent-group">
                <label>Father Name</label>

                <input
                  type="text"
                  name="father_name"
                  value={parent.father_name}
                  onChange={handleChange}
                  placeholder="Enter Father Name"
                />
              </div>

              <div className="add-parent-group">
                <label>Mother Name</label>

                <input
                  type="text"
                  name="mother_name"
                  value={parent.mother_name}
                  onChange={handleChange}
                  placeholder="Enter Mother Name"
                  required
                />
              </div>
            </div>

            <div className="add-parent-row">
              <div className="add-parent-group">
                <label>Guardian Name</label>

                <input
                  type="text"
                  name="guardian_name"
                  value={parent.guardian_name}
                  onChange={handleChange}
                  placeholder="Enter Guardian Name"
                />
              </div>

              <div className="add-parent-group">
                <label>Relationship</label>

                <input
                  type="text"
                  name="relationship"
                  value={parent.relationship}
                  onChange={handleChange}
                  placeholder="Example: Mother / Father / Guardian"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="parent-section">
            <div className="parent-section-header">
              <h3>Additional Information</h3>
              <p>Enter occupation, income, and address details.</p>
            </div>

            <div className="add-parent-row">
              <div className="add-parent-group">
                <label>Occupation</label>

                <input
                  type="text"
                  name="occupation"
                  value={parent.occupation}
                  onChange={handleChange}
                  placeholder="Enter Occupation"
                />
              </div>

              <div className="add-parent-group">
                <label>Annual Income</label>

                <input
                  type="number"
                  name="annual_income"
                  value={parent.annual_income}
                  onChange={handleChange}
                  placeholder="Enter Annual Income"
                  min="0"
                />
              </div>
            </div>

            <div className="add-parent-group">
              <label>Address</label>

              <textarea
                name="address"
                value={parent.address}
                onChange={handleChange}
                placeholder="Enter Complete Address"
                rows="4"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="add-parent-actions">
            <button
              type="button"
              className="add-parent-cancel"
              onClick={() => navigate("/manager/parents")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-parent-submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Parent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddParent;
