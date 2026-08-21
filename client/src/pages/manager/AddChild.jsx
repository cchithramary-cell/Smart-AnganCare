import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addChild } from "../../services/childService";

import "./AddChild.css";

function AddChild() {
  const navigate = useNavigate();

  const [child, setChild] = useState({
    parent_id: "",
    center_id: "",
    child_name: "",
    gender: "",
    dob: "",
    blood_group: "",
    birth_weight: "",
    current_height: "",
    current_weight: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setChild({
      ...child,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addChild(child);

      alert("Child Added Successfully");

      navigate("/manager/children");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to Add Child");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-child-page">
      <div className="add-child-card">
        {/* Header */}
        <div className="add-child-header">
          <p className="add-child-label">CHILD MANAGEMENT</p>

          <h2>Add New Child</h2>

          <p>Enter the child's personal, health, and growth information.</p>
        </div>

        {/* Form */}
        <form className="add-child-form" onSubmit={handleSubmit}>
          {/* Parent and Center */}
          <div className="add-child-row">
            <div className="add-child-group">
              <label>Parent ID</label>

              <input
                type="number"
                name="parent_id"
                value={child.parent_id}
                placeholder="Enter Parent ID"
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="add-child-group">
              <label>Center ID</label>

              <input
                type="number"
                name="center_id"
                value={child.center_id}
                placeholder="Enter Center ID"
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          {/* Child Name */}
          <div className="add-child-group">
            <label>Child Name</label>

            <input
              type="text"
              name="child_name"
              value={child.child_name}
              placeholder="Enter Child Name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender and DOB */}
          <div className="add-child-row">
            <div className="add-child-group">
              <label>Gender</label>

              <select
                name="gender"
                value={child.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="add-child-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={child.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Blood Group */}
          <div className="add-child-group">
            <label>Blood Group</label>

            <select
              name="blood_group"
              value={child.blood_group}
              onChange={handleChange}
            >
              <option value="">Select Blood Group (Optional)</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Growth Details */}
          <div className="growth-section">
            <h3>Growth Information</h3>

            <p>Enter the available growth measurements for the child.</p>

            <div className="add-child-row growth-row">
              <div className="add-child-group">
                <label>Birth Weight (kg)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="birth_weight"
                  value={child.birth_weight}
                  placeholder="Example: 3.20"
                  onChange={handleChange}
                />
              </div>

              <div className="add-child-group">
                <label>Current Height (cm)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="current_height"
                  value={child.current_height}
                  placeholder="Example: 95.50"
                  onChange={handleChange}
                />
              </div>

              <div className="add-child-group">
                <label>Current Weight (kg)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="current_weight"
                  value={child.current_weight}
                  placeholder="Example: 14.50"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="add-child-actions">
            <button
              type="button"
              className="add-child-cancel"
              onClick={() => navigate("/manager/children")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-child-submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Child"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChild;
