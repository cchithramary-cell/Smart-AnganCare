import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function NutritionChart({ normal = 0, moderate = 0, severe = 0 }) {
  const total = normal + moderate + severe;

  const data = {
    labels: ["Normal", "Moderate", "Severe"],

    datasets: [
      {
        data: [normal, moderate, severe],

        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],

        borderColor: ["#16a34a", "#d97706", "#dc2626"],

        borderWidth: 2,

        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

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

            return ` ${context.label}: ${value} Children (${percentage}%)`;
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
        No Nutrition Records Available
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
      <Pie data={data} options={options} />
    </div>
  );
}

export default NutritionChart;
