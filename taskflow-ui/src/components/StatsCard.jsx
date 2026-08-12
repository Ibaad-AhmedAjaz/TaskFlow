function StatsCard({ title, value, subtitle }) {
  return (
    <div className="stats-card">
      <div>
        <p className="stats-title">{title}</p>
        <h2 className="stats-value">{value}</h2>
        <p className="stats-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default StatsCard;