import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVaccination } from "../../services/vaccinationService";
import "./AddVaccination.css";

function AddVaccination() {
  const navigate = useNavigate();

  const [vaccination, setVaccination] = useState({
    child_id: "",
    vaccine_name: "",
    due_date: "",
    vaccination_date: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVaccination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addVaccination(vaccination);

      alert("Vaccination added successfully");

      navigate("/manager/vaccinations");
    } catch (error) {
      console.error("Vaccination Error:", error);

      alert(
        error.response?.data?.message || "Failed to add vaccination record",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vaccination-form-page">
      <div className="vaccination-form-card">
        <div className="vaccination-form-header">
          <div>
            <p className="page-label">VACCINATION MANAGEMENT</p>

            <h2>Add Vaccination Record</h2>

            <p className="page-description">
              Add and manage a child's vaccination details.
            </p>
          </div>
        </div>

        <form className="vaccination-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="child_id">Child ID</label>

            <input
              id="child_id"
              type="number"
              name="child_id"
              placeholder="Enter Child ID"
              value={vaccination.child_id}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vaccine_name">Vaccine Name</label>

            <input
              id="vaccine_name"
              type="text"
              name="vaccine_name"
              placeholder="Enter vaccine name"
              value={vaccination.vaccine_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>

              <input
                id="due_date"
                type="date"
                name="due_date"
                value={vaccination.due_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="vaccination_date">Vaccination Date</label>

              <input
                id="vaccination_date"
                type="date"
                name="vaccination_date"
                value={vaccination.vaccination_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Vaccination Status</label>

            <select
              id="status"
              name="status"
              value={vaccination.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/manager/vaccinations")}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Vaccination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVaccination;
