import { useEffect, useState } from "react";
import {
  FaUsers,
  FaChild,
  FaClipboardCheck,
  FaHeartbeat,
  FaAppleAlt,
  FaSyringe,
} from "react-icons/fa";

import "./ManagerDashboard.css";

function ManagerDashboard() {
  const [dashboard, setDashboard] = useState({
    parents: 0,
    children: 0,
    attendance: 0,
    growth: 0,
    nutrition: 0,
    vaccination: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    // Temporary values for UI development.
    // Replace with real API data later.
    setDashboard({
      parents: 25,
      children: 48,
      attendance: 45,
      growth: 48,
      nutrition: 48,
      vaccination: 41,
    });
  };

  const dashboardCards = [
    {
      title: "Parents",
      value: dashboard.parents,
      icon: <FaUsers />,
      description: "Registered parent records",
    },
    {
      title: "Children",
      value: dashboard.children,
      icon: <FaChild />,
      description: "Children under care",
    },
    {
      title: "Attendance",
      value: dashboard.attendance,
      icon: <FaClipboardCheck />,
      description: "Attendance records",
    },
    {
      title: "Growth Records",
      value: dashboard.growth,
      icon: <FaHeartbeat />,
      description: "Growth monitoring records",
    },
    {
      title: "Nutrition",
      value: dashboard.nutrition,
      icon: <FaAppleAlt />,
      description: "Nutrition assessments",
    },
    {
      title: "Vaccinations",
      value: dashboard.vaccination,
      icon: <FaSyringe />,
      description: "Vaccination records",
    },
  ];

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">OVERVIEW</p>
          <h1>Manager Dashboard</h1>
          <p className="subtitle">
            Monitor and manage your Smart AnganCare activities from one place.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Smart AnganCare</span>
          <strong>Management Portal</strong>
        </div>
      </div>

      <div className="dashboard-cards">
        {dashboardCards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <div className="card-top">
              <div className="icon">{card.icon}</div>

              <span className="card-status">Active</span>
            </div>

            <h3>{card.title}</h3>

            <h2>{card.value}</h2>

            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <div className="welcome-card">
        <div className="welcome-icon">
          <FaHeartbeat />
        </div>

        <div>
          <h2>Welcome, Manager 👋</h2>

          <p>
            You can manage parent and child information, track attendance,
            monitor growth and nutrition, and maintain vaccination records from
            the navigation menu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
