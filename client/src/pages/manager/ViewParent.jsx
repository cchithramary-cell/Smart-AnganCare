import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getParent } from "../../services/parentService";

import "./ViewParent.css";

function ViewParent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parent, setParent] = useState(null);
  const [error, setError] = useState("");

  const loadParent = async () => {
    try {
      setError("");

      const res = await getParent(id);
      setParent(res.data?.data || null);
    } catch (err) {
      console.error("Error loading parent:", err);
      setError(err.response?.data?.message || "Failed to load parent details");
    }
  };

  useEffect(() => {
    loadParent();
  }, [id]);

  if (!parent && !error) {
    return (
      <div className="view-parent-page">
        <div className="loading-message">Loading parent details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-parent-page">
        <div className="error-message">
          <h3>Unable to Load Parent Details</h3>
          <p>{error}</p>

          <button onClick={() => navigate("/manager/parents")}>
            Back to Parents
          </button>
        </div>
      </div>
    );
  }

  const details = [
    { label: "Father Name", value: parent.father_name },
    { label: "Mother Name", value: parent.mother_name },
    { label: "Guardian Name", value: parent.guardian_name },
    { label: "Relationship", value: parent.relationship },
    { label: "Occupation", value: parent.occupation },
    {
      label: "Annual Income",
      value: parent.annual_income
        ? `₹${Number(parent.annual_income).toLocaleString("en-IN")}`
        : "-",
    },
    { label: "Aadhaar Number", value: parent.aadhaar_no },
    { label: "Address", value: parent.address },
  ];

  return (
    <div className="view-parent-page">
      <div className="page-header">
        <div>
          <h2>Parent Details</h2>
          <p>View complete parent and guardian information.</p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/manager/parents")}
        >
          ← Back to Parents
        </button>
      </div>

      <div className="parent-details-card">
        <div className="parent-profile">
          <div className="parent-avatar">
            {parent.mother_name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div>
            <h3>{parent.mother_name || "Parent Details"}</h3>
            <p>Parent ID: {parent.parent_id || id}</p>
          </div>
        </div>

        <div className="details-grid">
          {details.map((detail) => (
            <div className="detail-item" key={detail.label}>
              <span className="detail-label">{detail.label}</span>
              <span className="detail-value">{detail.value || "-"}</span>
            </div>
          ))}
        </div>

        <div className="details-actions">
          <button
            className="edit-parent-btn"
            onClick={() => navigate(`/manager/edit-parent/${id}`)}
          >
            Edit Parent
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/manager/parents")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewParent;
