import "./DashboardCard.css";

function DashboardCard({ title, value, icon, color = "#198754" }) {
  return (
    <div
      className="dashboard-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div className="card-header">
        <h5>{title}</h5>

        <div
          className="card-icon"
          style={{
            backgroundColor: color,
          }}
        >
          {icon}
        </div>
      </div>

      <div className="card-body">
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;
