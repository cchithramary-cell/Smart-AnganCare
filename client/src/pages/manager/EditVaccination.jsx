import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getVaccination,
  updateVaccination,
} from "../../services/vaccinationService";

import "./EditVaccination.css";

function EditVaccination() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vaccination, setVaccination] = useState({
    child_id: "",
    vaccine_name: "",
    due_date: "",
    vaccination_date: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";

    return date.substring(0, 10);
  };

  useEffect(() => {
    const loadVaccination = async () => {
      try {
        setLoading(true);

        const res = await getVaccination(id);
        const data = res.data?.data;

        setVaccination({
          child_id: data?.child_id || "",
          vaccine_name: data?.vaccine_name || "",
          due_date: formatDate(data?.due_date),
          vaccination_date: formatDate(data?.vaccination_date),
          status: data?.status || "Pending",
        });
      } catch (error) {
        console.error("Load Vaccination Error:", error);

        alert(
          error.response?.data?.message || "Failed to load vaccination record",
        );
      } finally {
        setLoading(false);
      }
    };

    loadVaccination();
  }, [id]);

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
      setUpdating(true);

      await updateVaccination(id, vaccination);

      alert("Vaccination Updated Successfully");

      navigate("/manager/vaccinations");
    } catch (error) {
      console.error("Update Vaccination Error:", error);

      alert(error.response?.data?.message || "Vaccination Update Failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="vaccination-page">
        <p className="loading-text">Loading vaccination record...</p>
      </div>
    );
  }

  return (
    <div className="vaccination-page">
      <div className="vaccination-form-card">
        <div className="form-header">
          <div>
            <h2>Edit Vaccination</h2>
            <p>Update the vaccination details for this child.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="vaccination-form">
          <div className="form-group">
            <label>Child ID</label>

            <input
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
            <label>Vaccine Name</label>

            <input
              type="text"
              name="vaccine_name"
              placeholder="Enter Vaccine Name"
              value={vaccination.vaccine_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>

              <input
                type="date"
                name="due_date"
                value={vaccination.due_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Vaccination Date</label>

              <input
                type="date"
                name="vaccination_date"
                value={vaccination.vaccination_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={vaccination.status}
              onChange={handleChange}
              required
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
            >
              Cancel
            </button>

            <button type="submit" className="submit-btn" disabled={updating}>
              {updating ? "Updating..." : "Update Vaccination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVaccination;
