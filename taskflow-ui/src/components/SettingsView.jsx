import { useState } from "react";

function SettingsView({ darkMode, setDarkMode }) {
  const [compactMode, setCompactMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <section className="page-panel settings-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PREFERENCES</p>
          <h2>Settings</h2>
          <p>Customize your TaskFlow workspace.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div>
            <h3>Interface</h3>
            <p>Control how your dashboard feels.</p>
          </div>

          <div className="setting-row">
            <div className="setting-row">
  <div>
    <strong>Dark Mode</strong>
    <span>Switch between light and dark themes.</span>
  </div>

  <button
    className={`toggle ${darkMode ? "enabled" : ""}`}
    onClick={() => setDarkMode(!darkMode)}
  >
    <span />
  </button>
</div>
            <div>
              <strong>Compact task cards</strong>
              <span>Reduce spacing inside task cards.</span>
            </div>

            <button
              className={`toggle ${compactMode ? "enabled" : ""}`}
              onClick={() => setCompactMode(!compactMode)}
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Notifications</strong>
              <span>Receive productivity reminders.</span>
            </div>

            <button
              className={`toggle ${notifications ? "enabled" : ""}`}
              onClick={() => setNotifications(!notifications)}
            >
              <span />
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div>
            <h3>Default Preferences</h3>
            <p>Defaults used when creating a new task.</p>
          </div>

          <label>Default Priority</label>
          <select defaultValue="Medium">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Default Status</label>
          <select defaultValue="Pending">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="settings-card about-card">
          <div className="about-logo">T</div>

          <div>
            <h3>TaskFlow v1.0</h3>
            <p>
              Full-stack task management application built with React,
              ASP.NET Core, Entity Framework Core and SQLite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsView;