import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function AttendanceChart({ present = 0, absent = 0 }) {
  const data = {
    labels: ["Present", "Absent"],

    datasets: [
      {
        label: "Students",

        data: [present, absent],

        backgroundColor: ["rgba(34, 197, 94, 0.75)", "rgba(239, 68, 68, 0.75)"],

        borderColor: ["#16a34a", "#dc2626"],

        borderWidth: 1,
        borderRadius: 8,

        maxBarThickness: 70,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#1f2937",
        padding: 12,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",

        callbacks: {
          label: function (context) {
            return ` ${context.parsed.y} Children`;
          },
        },
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
            size: 13,
            weight: "600",
          },
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
          color: "#6b7280",
        },

        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        position: "relative",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default AttendanceChart;
