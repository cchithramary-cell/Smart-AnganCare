import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function VaccinationChart({ completed = 0, pending = 0 }) {
  const total = completed + pending;

  const data = {
    labels: ["Completed", "Pending"],

    datasets: [
      {
        data: [completed, pending],

        backgroundColor: [
          "rgba(37, 99, 235, 0.85)",
          "rgba(245, 158, 11, 0.85)",
        ],

        borderColor: ["#2563eb", "#d97706"],

        borderWidth: 2,

        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",

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

        callbacks: {
          label: function (context) {
            const value = context.parsed || 0;

            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;

            return ` ${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (total === 0) {
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
        No Vaccination Records Available
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        position: "relative",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default VaccinationChart;
