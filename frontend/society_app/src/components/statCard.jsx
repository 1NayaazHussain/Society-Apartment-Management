import "../styles/StatCard.css";
function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

export default StatCard;