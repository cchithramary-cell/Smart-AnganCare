import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import "./AddManager.css";

function EditManager() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    status: "active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchManager();
  }, [id]);

  const fetchManager = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/managers/${id}`);
      const manager = response?.data?.data || response?.data?.manager || {};

      setFormData({
        full_name: manager.full_name || "",
        email: manager.email || "",
        phone: manager.phone || "",
        status: manager.status || "active",
      });
    } catch (err) {
      console.error("Fetch manager error:", err);

      alert(err.response?.data?.message || "Failed to load manager");

      navigate("/admin/managers");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put(`/admin/managers/${id}`, formData);

      alert("Manager updated successfully");

      navigate("/admin/managers");
    } catch (err) {
      console.error("Update manager error:", err);

      alert(err.response?.data?.message || "Failed to update manager");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading manager...</div>;
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <h1>Edit Manager</h1>

        <button type="button" onClick={() => navigate("/admin/managers")}>
          Back
        </button>
      </div>

      <form className="data-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" disabled={saving} className="submit-btn">
          {saving ? "Updating..." : "Update Manager"}
        </button>
      </form>
    </div>
  );
}

export default EditManager;
