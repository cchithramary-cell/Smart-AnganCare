import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUsers,
  FaChild,
  FaSyringe,
  FaClipboardCheck,
  FaClipboardList,
  FaChartBar,
  FaBuilding,
  FaUserTie,
  FaArrowRight,
  FaHeartbeat,
} from "react-icons/fa";

import { getDashboardStats } from "../../services/analyticsService";

import "./AdminDashboard.css";

function AdminDashboard() {
  const initialDashboard = {
    totalCenters: 0,
    totalManagers: 0,
    totalParents: 0,
    totalChildren: 0,
    presentToday: 0,
    absentToday: 0,
    vaccinationCompleted: 0,
    vaccinationPending: 0,
    averageBMI: 0,
  };

  const [dashboard, setDashboard] = useState(initialDashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await getDashboardStats();

        setDashboard(response?.data?.data || initialDashboard);
      } catch (error) {
        console.error("Dashboard Error:", error);
        alert(error.response?.data?.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statistics = [
    {
      title: "Total Centers",
      value: dashboard.totalCenters,
      icon: <FaBuilding />,
      type: "centers",
    },
    {
      title: "Managers",
      value: dashboard.totalManagers,
      icon: <FaUserTie />,
      type: "managers",
    },
    {
      title: "Parents",
      value: dashboard.totalParents,
      icon: <FaUsers />,
      type: "parents",
    },
    {
      title: "Children",
      value: dashboard.totalChildren,
      icon: <FaChild />,
      type: "children",
    },
    {
      title: "Present Today",
      value: dashboard.presentToday,
      icon: <FaClipboardCheck />,
      type: "present",
    },
    {
      title: "Absent Today",
      value: dashboard.absentToday,
      icon: <FaClipboardList />,
      type: "absent",
    },
    {
      title: "Vaccinated",
      value: dashboard.vaccinationCompleted,
      icon: <FaSyringe />,
      type: "vaccinated",
    },
    {
      title: "Pending Vaccine",
      value: dashboard.vaccinationPending,
      icon: <FaHeartbeat />,
      type: "pending",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">ADMINISTRATION PANEL</p>

          <h1>Smart AnganCare Dashboard</h1>

          <p className="subtitle">
            Monitor your Anganwadi centers, child health records and system
            activities from one place.
          </p>
        </div>

        <div className="admin-badge">
          <div className="admin-icon">
            <FaUserTie />
          </div>

          <div>
            <span>Welcome back</span>
            <strong>Administrator</strong>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="section-header">
        <div>
          <h2>Overview</h2>
          <p>Current system statistics</p>
        </div>
      </div>

      <div className="cards">
        {statistics.map((item) => (
          <div className={`stat-card ${item.type}`} key={item.title}>
            <div className="stat-icon">{item.icon}</div>

            <div className="stat-content">
              <p>{item.title}</p>
              <h2>{item.value ?? 0}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Section */}
      <div className="dashboard-bottom">
        <div className="welcome">
          <div className="welcome-content">
            <p className="welcome-label">SMART MANAGEMENT</p>

            <h2>Everything under one dashboard</h2>

            <p>
              Manage centers and managers, monitor child health information, and
              analyze attendance and vaccination data efficiently.
            </p>
          </div>

          <div className="welcome-icon">
            <FaChartBar />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <p>Navigate quickly to important modules</p>

          <div className="action-list">
            <Link to="/admin/centers" className="action-item">
              <FaBuilding />
              <span>Manage Centers</span>
              <FaArrowRight className="arrow" />
            </Link>

            <Link to="/admin/managers" className="action-item">
              <FaUserTie />
              <span>Manage Managers</span>
              <FaArrowRight className="arrow" />
            </Link>

            <Link to="/admin/analytics" className="action-item">
              <FaChartBar />
              <span>View Analytics</span>
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
