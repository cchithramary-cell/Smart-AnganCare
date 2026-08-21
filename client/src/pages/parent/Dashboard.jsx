import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [child, setChild] = useState({
    childName: "",
    age: "",
    gender: "",
    center: "",
    latestHeight: "",
    latestWeight: "",
    nextVaccination: "",
    latestAttendance: "",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Temporary data
      // Later we will connect this with your backend API
      setChild({
        childName: "Arun",
        age: "4 Years",
        gender: "Male",
        center: "Anganwadi Center 1",
        latestHeight: "80.00 cm",
        latestWeight: "15.00 kg",
        nextVaccination: "No Pending Vaccination",
        latestAttendance: "Present",
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <h1>Parent Dashboard</h1>
        <h2>{child.childName}'s Details</h2>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Child Name</h3>
          <p>{child.childName || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Age</h3>
          <p>{child.age || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Gender</h3>
          <p>{child.gender || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Center</h3>
          <p>{child.center || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Latest Height</h3>
          <p>{child.latestHeight || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Latest Weight</h3>
          <p>{child.latestWeight || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Next Vaccination</h3>
          <p>{child.nextVaccination || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Latest Attendance</h3>
          <p>{child.latestAttendance || "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
