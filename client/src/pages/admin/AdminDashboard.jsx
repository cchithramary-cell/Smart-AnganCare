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

function AdminDashboard() {
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
    {
      title: "Average BMI",
      value: dashboard.averageBMI,
      icon: <FaChartBar />,
      type: "bmi",
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
      <header className="dashboard-header">
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
      </header>

      <section className="section-header">
        <div>
          <h2>Overview</h2>
          <p>Current system statistics</p>
        </div>
      </section>

      <section className="cards" aria-label="Admin statistics overview">
        {statistics.map((item) => (
          <article className={`stat-card ${item.type}`} key={item.title}>
            <div className="stat-icon">{item.icon}</div>

            <div className="stat-content">
              <p>{item.title}</p>
              <h2>{item.value ?? 0}</h2>
            </div>
          </article>
        ))}
      </section>

      <div className="dashboard-bottom">
        <section className="welcome">
          <div className="welcome-content">
            <span className="welcome-label">SYSTEM HEALTH</span>
            <h2>Operational summary</h2>
            <p>
              Your centers are running smoothly and the administration team can
              monitor performance, attendance, vaccination progress, and child
              wellbeing from a single dashboard.
            </p>
          </div>

          <div className="welcome-icon">
            <FaChartBar />
          </div>
        </section>

        <section className="quick-actions">
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
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
