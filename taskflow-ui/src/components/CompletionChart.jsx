function CompletionChart({ completed, total }) {
  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="completion-card">
      <div>
        <p className="eyebrow">PROGRESS</p>
        <h3>Completion Rate</h3>

        <p className="completion-copy">
          Keep your momentum going.
        </p>
      </div>

      <div
        className="completion-chart"
        style={{
          background: `conic-gradient(
            #725ceb ${percentage}%,
            #ececf4 ${percentage}% 100%
          )`,
        }}
      >
        <div className="chart-center">
          <strong>{percentage}%</strong>
          <span>Complete</span>
        </div>
      </div>
    </div>
  );
}

export default CompletionChart;