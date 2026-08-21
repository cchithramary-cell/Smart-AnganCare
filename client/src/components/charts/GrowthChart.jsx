import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function GrowthChart({ growth = [] }) {
  const data = {
    labels: growth.map((item) => item.month || item.recorded_date || "Unknown"),

    datasets: [
      {
        label: "Height (cm)",
        data: growth.map((item) => Number(item.height) || 0),

        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",

        borderWidth: 3,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,

        tension: 0.4,
        fill: false,
      },

      {
        label: "Weight (kg)",
        data: growth.map((item) => Number(item.weight) || 0),

        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.15)",

        borderWidth: 3,
        pointBackgroundColor: "#16a34a",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,

        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#374151",
          font: {
            size: 13,
            weight: "600",
          },
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",
        padding: 12,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#e5e7eb",
        },

        ticks: {
          color: "#6b7280",
        },
      },
    },
  };

  if (growth.length === 0) {
    return (
      <div
        style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
        }}
      >
        No Growth Records Available
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        position: "relative",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default GrowthChart;
