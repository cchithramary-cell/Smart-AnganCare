import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaChild,
  FaBirthdayCake,
  FaVenusMars,
  FaBuilding,
  FaRulerVertical,
  FaWeight,
  FaSyringe,
  FaClipboardCheck,
  FaArrowRight,
} from "react-icons/fa";

import { getDashboard } from "../../services/parentDashboardService";

import "./ParentDashboard.css";

function ParentDashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      console.log("Parent Dashboard Response:", response.data);

      const data = response.data?.data;

      // Handle both array and single-object API responses
      setDashboard(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error("Load Dashboard Error:", error);

      alert(error.response?.data?.message || "Unable to load parent dashboard");

      setDashboard([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="parent-dashboard">
        <div className="parent-loading">
          <div className="loader"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Parent Dashboard</h1>
          <p>Monitor your child's health, growth and daily records.</p>
        </div>

        <div className="header-icon">
          <FaChild />
        </div>
      </div>

      {dashboard.length > 0 ? (
        <>
          {/* Child Dashboard */}
          {dashboard.map((child) => (
            <div key={child.child_id || child.id} className="child-dashboard">
              {/* Child Header */}
              <div className="child-info-header">
                <div className="child-avatar">
                  <FaChild />
                </div>

                <div>
                  <h2>{child.child_name || "Child Details"}</h2>

                  <p>
                    View the latest information and health records of your
                    child.
                  </p>
                </div>
              </div>

              {/* Dashboard Cards */}
              <div className="parent-dashboard-cards">
                {/* Child Name */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaChild />
                  </div>

                  <div>
                    <span>Child Name</span>
                    <h3>{child.child_name || "N/A"}</h3>
                  </div>
                </div>

                {/* Age */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaBirthdayCake />
                  </div>

                  <div>
                    <span>Age</span>

                    <h3>
                      {child.age !== null && child.age !== undefined
                        ? `${child.age} Years`
                        : "N/A"}
                    </h3>
                  </div>
                </div>

                {/* Gender */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaVenusMars />
                  </div>

                  <div>
                    <span>Gender</span>
                    <h3>{child.gender || "N/A"}</h3>
                  </div>
                </div>

                {/* Anganwadi Center */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaBuilding />
                  </div>

                  <div>
                    <span>Anganwadi Center</span>
                    <h3>{child.center_name || "N/A"}</h3>
                  </div>
                </div>

                {/* Latest Height */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaRulerVertical />
                  </div>

                  <div>
                    <span>Latest Height</span>

                    <h3>
                      {child.height !== null && child.height !== undefined
                        ? `${child.height} cm`
                        : "N/A"}
                    </h3>
                  </div>
                </div>

                {/* Latest Weight */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaWeight />
                  </div>

                  <div>
                    <span>Latest Weight</span>

                    <h3>
                      {child.weight !== null && child.weight !== undefined
                        ? `${child.weight} kg`
                        : "N/A"}
                    </h3>
                  </div>
                </div>

                {/* Next Vaccination */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaSyringe />
                  </div>

                  <div>
                    <span>Next Vaccination</span>

                    <h3>
                      {child.next_vaccination || "No Pending Vaccination"}
                    </h3>
                  </div>
                </div>

                {/* Today's Attendance */}
                <div className="parent-dashboard-card">
                  <div className="dashboard-card-icon">
                    <FaClipboardCheck />
                  </div>

                  <div>
                    <span>Today's Attendance</span>

                    <h3
                      className={
                        child.attendance === "Present"
                          ? "status-present"
                          : child.attendance === "Absent"
                            ? "status-absent"
                            : ""
                      }
                    >
                      {child.attendance || "No Attendance Record"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Access */}
          <div className="quick-access">
            <div className="quick-access-title">
              <h2>Quick Access</h2>
              <p>View your child's complete records.</p>
            </div>

            <div className="quick-links">
              {/* CORRECTED ROUTE */}
              <Link to="/parent/my-child" className="quick-link">
                <span>My Child</span>
                <FaArrowRight />
              </Link>

              <Link to="/parent/growth" className="quick-link">
                <span>Growth Records</span>
                <FaArrowRight />
              </Link>

              <Link to="/parent/attendance" className="quick-link">
                <span>Attendance</span>
                <FaArrowRight />
              </Link>

              <Link to="/parent/nutrition" className="quick-link">
                <span>Nutrition</span>
                <FaArrowRight />
              </Link>

              <Link to="/parent/vaccination" className="quick-link">
                <span>Vaccination</span>
                <FaArrowRight />
              </Link>

              <Link to="/parent/reports" className="quick-link">
                <span>Reports</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </>
      ) : (
        /* No Data State */
        <div className="no-data-card">
          <FaChild />

          <h2>No Child Details Found</h2>

          <p>There are currently no child records linked to your account.</p>
        </div>
      )}
    </div>
  );
}

export default ParentDashboard;
