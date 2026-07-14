import "../styles/StatCard.css";


function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          {icon}
        </div>

        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <h2>{value}</h2>
        </div>

      </div>

      <div className="stat-footer">
        <span className="status-dot"></span>
        <span>{subtitle}</span>
      </div>

    </div>
  );
}

export default StatCard;