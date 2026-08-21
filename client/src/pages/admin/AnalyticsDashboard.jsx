import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getGrowthStats,
  getNutritionStats,
  getVaccinationStats,
} from "../../services/analyticsService";

import {
  FaChild,
  FaUserCheck,
  FaSyringe,
  FaHeartbeat,
  FaChartLine,
} from "react-icons/fa";

import "./AnalyticsDashboard.css";

import AttendanceChart from "../../components/charts/AttendanceChart";
import NutritionChart from "../../components/charts/NutritionChart";
import VaccinationChart from "../../components/charts/VaccinationChart";
import GrowthChart from "../../components/charts/GrowthChart";

function AnalyticsDashboard() {
  const initialStats = {
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

  const [stats, setStats] = useState(initialStats);

  const [nutrition, setNutrition] = useState({
    normal: 0,
    moderate: 0,
    severe: 0,
  });

  const [vaccination, setVaccination] = useState({
    completed: 0,
    pending: 0,
  });

  const [growth, setGrowth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const [
          dashboardResponse,
          nutritionResponse,
          vaccinationResponse,
          growthResponse,
        ] = await Promise.all([
          getDashboardStats(),
          getNutritionStats(),
          getVaccinationStats(),
          getGrowthStats(),
        ]);

        setStats(dashboardResponse?.data?.data || initialStats);

        setNutrition(
          nutritionResponse?.data?.data || {
            normal: 0,
            moderate: 0,
            severe: 0,
          },
        );

        setVaccination(
          vaccinationResponse?.data?.data || {
            completed: 0,
            pending: 0,
          },
        );

        setGrowth(growthResponse?.data?.data || []);
      } catch (error) {
        console.error("Analytics Error:", error);

        alert(error.response?.data?.message || "Unable to Load Analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Attendance percentage
  const totalAttendance =
    Number(stats.presentToday || 0) + Number(stats.absentToday || 0);

  const attendanceRate =
    totalAttendance > 0
      ? ((Number(stats.presentToday || 0) / totalAttendance) * 100).toFixed(1)
      : 0;

  // Vaccination percentage
  const totalVaccinations =
    Number(stats.vaccinationCompleted || 0) +
    Number(stats.vaccinationPending || 0);

  const vaccinationRate =
    totalVaccinations > 0
      ? (
          (Number(stats.vaccinationCompleted || 0) / totalVaccinations) *
          100
        ).toFixed(1)
      : 0;

  const summaryStats = [
    {
      title: "Total Children",
      value: stats.totalChildren || 0,
      subtitle: "Registered children",
      icon: <FaChild />,
      type: "children",
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      subtitle: `${stats.presentToday || 0} present today`,
      icon: <FaUserCheck />,
      type: "present",
    },
    {
      title: "Vaccination Rate",
      value: `${vaccinationRate}%`,
      subtitle: `${stats.vaccinationCompleted || 0} completed`,
      icon: <FaSyringe />,
      type: "vaccinated",
    },
    {
      title: "Average BMI",
      value: stats.averageBMI || 0,
      subtitle: "Overall child health",
      icon: <FaHeartbeat />,
      type: "bmi",
    },
  ];

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="analytics-loader"></div>
        <p>Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      {/* HEADER */}

      <div className="analytics-header">
        <div>
          <p className="analytics-label">DATA & INSIGHTS</p>

          <h1>
            <FaChartLine />
            Analytics Dashboard
          </h1>

          <p>
            Analyze child health, attendance, nutrition, vaccination and growth
            data through visual reports.
          </p>
        </div>

        <div className="analytics-summary">
          <FaChartLine />

          <div>
            <span>Analytics Overview</span>
            <strong>{stats.totalChildren || 0}</strong>
            <small>Children Analyzed</small>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="analytics-section-title">
        <div>
          <h2>Key Performance Indicators</h2>
          <p>Quick summary of important child care metrics</p>
        </div>
      </div>

      <div className="analytics-stats-grid">
        {summaryStats.map((item) => (
          <div className={`analytics-stat-card ${item.type}`} key={item.title}>
            <div className="analytics-stat-icon">{item.icon}</div>

            <div className="analytics-stat-content">
              <p>{item.title}</p>
              <h2>{item.value}</h2>
              <span>{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}

      <div className="analytics-charts-grid">
        {/* ATTENDANCE */}

        <div className="chart-section">
          <div className="chart-heading">
            <h2>Attendance Analytics</h2>
            <p>Present and absent children today</p>
          </div>

          <div className="chart-card">
            <AttendanceChart
              present={stats.presentToday || 0}
              absent={stats.absentToday || 0}
            />
          </div>
        </div>

        {/* NUTRITION */}

        <div className="chart-section">
          <div className="chart-heading">
            <h2>Nutrition Analytics</h2>
            <p>Child nutrition status distribution</p>
          </div>

          <div className="chart-card">
            <NutritionChart
              normal={nutrition.normal || 0}
              moderate={nutrition.moderate || 0}
              severe={nutrition.severe || 0}
            />
          </div>
        </div>

        {/* VACCINATION */}

        <div className="chart-section">
          <div className="chart-heading">
            <h2>Vaccination Analytics</h2>
            <p>Completed versus pending vaccinations</p>
          </div>

          <div className="chart-card">
            <VaccinationChart
              completed={vaccination.completed || 0}
              pending={vaccination.pending || 0}
            />
          </div>
        </div>

        {/* GROWTH */}

        <div className="chart-section growth-section">
          <div className="chart-heading">
            <h2>Growth Analytics</h2>
            <p>Height and weight growth trends</p>
          </div>

          <div className="chart-card growth-chart-card">
            <GrowthChart growth={growth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
