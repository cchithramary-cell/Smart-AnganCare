import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChild, updateChild } from "../../services/childService";

import "./EditChild.css";

function EditChild() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadChild = async () => {
      try {
        setLoading(true);

        const response = await getChild(id);

        console.log("FULL API RESPONSE:", response);
        console.log("API DATA:", response.data);

        // Backend service returns:
        // {
        //   success: true,
        //   data: child
        // }
        const data = response.data?.data;

        console.log("CHILD DATA:", data);

        if (!data) {
          throw new Error("Child details not found");
        }

        // Keep form values as strings while editing to avoid controlled/uncontrolled issues
        setChild({
          parent_id: data.parent_id != null ? String(data.parent_id) : "",
          center_id: data.center_id != null ? String(data.center_id) : "",
          child_name: data.child_name ?? "",
          gender: data.gender ?? "",
          dob: data.dob ? String(data.dob).split("T")[0] : "",
          blood_group: data.blood_group ?? "",
          birth_weight:
            data.birth_weight != null ? String(data.birth_weight) : "",
          current_height:
            data.current_height != null ? String(data.current_height) : "",
          current_weight:
            data.current_weight != null ? String(data.current_weight) : "",
          status: data.status ?? "Active",
        });
      } catch (error) {
        console.error("LOAD CHILD ERROR:", error);

        alert(
          error.response?.data?.message ||
            error.message ||
            "Unable to load child details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadChild();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setChild((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Convert numeric fields back to numbers (or omit if empty)
      const payload = {
        ...child,
        parent_id: child.parent_id !== "" ? Number(child.parent_id) : undefined,
        center_id: child.center_id !== "" ? Number(child.center_id) : undefined,
        birth_weight:
          child.birth_weight !== "" ? Number(child.birth_weight) : undefined,
        current_height:
          child.current_height !== ""
            ? Number(child.current_height)
            : undefined,
        current_weight:
          child.current_weight !== ""
            ? Number(child.current_weight)
            : undefined,
      };

      await updateChild(id, payload);

      alert("Child Updated Successfully");

      navigate("/manager/children");
    } catch (error) {
      console.error("UPDATE CHILD ERROR:", error);

      alert(error.response?.data?.message || "Failed to update child details");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-child-page">
        <div className="edit-child-loading">
          Loading existing child details...
        </div>
      </div>
    );
  }

  return (
    <div className="edit-child-page">
      <div className="edit-child-container">
        <div className="edit-child-header">
          <div>
            <h2>Edit Child</h2>
            <p>
              Existing child details are loaded below. Change only the
              information you want to update.
            </p>
          </div>

          <button
            type="button"
            className="edit-child-back-btn"
            onClick={() => navigate("/manager/children")}
          >
            ← Back
          </button>
        </div>

        <form className="edit-child-form" onSubmit={handleSubmit}>
          <div className="edit-child-section">
            <h3>Basic Information</h3>

            <div className="edit-child-grid">
              <div className="edit-child-group">
                <label>Parent ID</label>
                <input
                  type="number"
                  name="parent_id"
                  value={child.parent_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-child-group">
                <label>Center ID</label>
                <input
                  type="number"
                  name="center_id"
                  value={child.center_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-child-group">
                <label>Child Name</label>
                <input
                  type="text"
                  name="child_name"
                  value={child.child_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-child-group">
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

              <div className="edit-child-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={child.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="edit-child-group">
                <label>Blood Group</label>
                <input
                  type="text"
                  name="blood_group"
                  value={child.blood_group}
                  onChange={handleChange}
                  placeholder="Example: O+"
                />
              </div>
            </div>
          </div>

          <div className="edit-child-section">
            <h3>Health Information</h3>

            <div className="edit-child-grid">
              <div className="edit-child-group">
                <label>Birth Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="birth_weight"
                  value={child.birth_weight}
                  onChange={handleChange}
                />
              </div>

              <div className="edit-child-group">
                <label>Current Height (cm)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="current_height"
                  value={child.current_height}
                  onChange={handleChange}
                />
              </div>

              <div className="edit-child-group">
                <label>Current Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="current_weight"
                  value={child.current_weight}
                  onChange={handleChange}
                />
              </div>

              <div className="edit-child-group">
                <label>Status</label>
                <select
                  name="status"
                  value={child.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="edit-child-actions">
            <button
              type="button"
              className="edit-child-cancel-btn"
              onClick={() => navigate("/manager/children")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-child-save-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Child"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChild;
