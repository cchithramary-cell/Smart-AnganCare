import { useNavigate } from "react-router-dom";
import {
  FaClipboardCheck,
  FaHeartbeat,
  FaAppleAlt,
  FaSyringe,
} from "react-icons/fa";

import "./MReports.css";

function MReports() {
  const navigate = useNavigate();

  const reports = [
    {
      title: "Attendance",
      description: "View and manage children's attendance records.",
      icon: <FaClipboardCheck />,
      path: "/manager/attendance",
      buttonText: "View Attendance",
    },
    {
      title: "Growth",
      description: "View and manage children's height, weight and BMI records.",
      icon: <FaHeartbeat />,
      path: "/manager/growth",
      buttonText: "View Growth",
    },
    {
      title: "Nutrition",
      description: "View and manage children's nutrition records and status.",
      icon: <FaAppleAlt />,
      path: "/manager/nutrition",
      buttonText: "View Nutrition",
    },
    {
      title: "Vaccination",
      description: "View and manage children's vaccination records and status.",
      icon: <FaSyringe />,
      path: "/manager/vaccinations",
      buttonText: "View Vaccination",
    },
  ];

  return (
    <div className="reports-page">
      <div className="reports-info-card">
        <h3>Report Overview</h3>
        <p>
          Select a report category to view and manage detailed records for
          children in your Anganwadi center.
        </p>
      </div>

      <div className="reports-container">
        {reports.map((report) => (
          <div className="report-card" key={report.title}>
            <div className="report-icon">{report.icon}</div>

            <h3>{report.title}</h3>

            <p>{report.description}</p>

            <button
              type="button"
              className="report-btn"
              onClick={() => navigate(report.path)}
            >
              {report.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MReports;
