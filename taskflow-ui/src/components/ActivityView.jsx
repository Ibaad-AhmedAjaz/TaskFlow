function ActivityView({ activities }) {
  const icons = {
    created: "+",
    updated: "✎",
    deleted: "×",
    completed: "✓",
  };

  return (
    <section className="page-panel">
      <div className="page-heading">
        <div>
          <p className="eyebrow">RECENT CHANGES</p>
          <h2>Activity</h2>
          <p>See the latest actions performed inside TaskFlow.</p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⌁</div>

          <h3>No activity yet</h3>

          <p>
            Create, edit, complete, or delete a task to generate activity.
          </p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <div className={`activity-icon ${activity.type}`}>
                {icons[activity.type] || "•"}
              </div>

              <div className="activity-content">
                <p>{activity.message}</p>

                <span>
                  {new Date(activity.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ActivityView;