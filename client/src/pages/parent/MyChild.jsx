import { useEffect, useState } from "react";
import {
  FaChild,
  FaBirthdayCake,
  FaVenusMars,
  FaTint,
  FaWeight,
  FaRulerVertical,
  FaBuilding,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { getMyChild } from "../../services/parentDashboardService";
import "./MyChild.css";

function MyChild() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      setLoading(true);

      const response = await getMyChild();
      const data = response.data.data;

      // Always store data as an array
      setChildren(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error("Load Child Error:", error);

      alert(error.response?.data?.message || "Unable to Load Child Details");

      setChildren([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <div className="my-child-page">
        <div className="page-header">
          <div>
            <h2>My Child</h2>
            <p>View your child's complete information</p>
          </div>
        </div>

        <div className="loading-card">
          <div className="loading-spinner"></div>
          <p>Loading child details...</p>
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="my-child-page">
        <div className="page-header">
          <div>
            <h2>My Child</h2>
            <p>View your child's complete information</p>
          </div>
        </div>

        <div className="empty-card">
          <FaChild className="empty-icon" />
          <h3>No Child Details Found</h3>
          <p>
            There are currently no child details associated with your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-child-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>My Child</h2>
          <p>View your child's complete information and profile details</p>
        </div>
      </div>

      {children.map((child) => (
        <div className="child-profile-card" key={child.child_id}>
          {/* Child Profile Header */}
          <div className="child-profile-header">
            <div className="child-avatar">
              <FaChild />
            </div>

            <div className="child-title">
              <h3>{child.child_name || "Child Name"}</h3>
              <p>Child ID: #{child.child_id}</p>
            </div>

            <span
              className={`status-badge ${
                child.status?.toLowerCase() === "active" ? "active" : "inactive"
              }`}
            >
              {child.status || "N/A"}
            </span>
          </div>

          {/* Personal Information */}
          <div className="section-title">
            <h3>Personal Information</h3>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <FaBirthdayCake className="detail-icon" />
              <div>
                <span>Date of Birth</span>
                <strong>{formatDate(child.dob)}</strong>
              </div>
            </div>

            <div className="detail-card">
              <FaChild className="detail-icon" />
              <div>
                <span>Age</span>
                <strong>{calculateAge(child.dob)} Years</strong>
              </div>
            </div>

            <div className="detail-card">
              <FaVenusMars className="detail-icon" />
              <div>
                <span>Gender</span>
                <strong>{child.gender || "N/A"}</strong>
              </div>
            </div>

            <div className="detail-card">
              <FaTint className="detail-icon" />
              <div>
                <span>Blood Group</span>
                <strong>{child.blood_group || "N/A"}</strong>
              </div>
            </div>
          </div>

          {/* Growth Information */}
          <div className="section-title">
            <h3>Growth Information</h3>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <FaWeight className="detail-icon" />
              <div>
                <span>Birth Weight</span>
                <strong>
                  {child.birth_weight !== null &&
                  child.birth_weight !== undefined
                    ? `${child.birth_weight} kg`
                    : "N/A"}
                </strong>
              </div>
            </div>

            <div className="detail-card">
              <FaRulerVertical className="detail-icon" />
              <div>
                <span>Current Height</span>
                <strong>
                  {child.current_height !== null &&
                  child.current_height !== undefined
                    ? `${child.current_height} cm`
                    : "N/A"}
                </strong>
              </div>
            </div>

            <div className="detail-card">
              <FaWeight className="detail-icon" />
              <div>
                <span>Current Weight</span>
                <strong>
                  {child.current_weight !== null &&
                  child.current_weight !== undefined
                    ? `${child.current_weight} kg`
                    : "N/A"}
                </strong>
              </div>
            </div>
          </div>

          {/* Center and Parent Information */}
          <div className="section-title">
            <h3>Center & Family Information</h3>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <FaBuilding className="detail-icon" />
              <div>
                <span>Center Name</span>
                <strong>{child.center_name || "N/A"}</strong>
              </div>
            </div>

            <div className="detail-card">
              <FaUser className="detail-icon" />
              <div>
                <span>Father Name</span>
                <strong>{child.father_name || "N/A"}</strong>
              </div>
            </div>

            <div className="detail-card">
              <FaUser className="detail-icon" />
              <div>
                <span>Mother Name</span>
                <strong>{child.mother_name || "N/A"}</strong>
              </div>
            </div>

            <div className="detail-card">
              <FaUsers className="detail-icon" />
              <div>
                <span>Guardian Name</span>
                <strong>{child.guardian_name || "N/A"}</strong>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyChild;
