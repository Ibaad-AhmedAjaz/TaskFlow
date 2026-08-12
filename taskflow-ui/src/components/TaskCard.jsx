import { CalendarDays, Pencil, Trash2 } from "lucide-react";

function TaskCard({ task, onEdit, onDelete }) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <div className="task-card">
      <div className="task-card-top">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>

        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-meta">
        <span
          className={`status-badge ${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {task.status}
        </span>

        <span className="due-date icon-text">
          <CalendarDays size={14} />
          {formattedDate}
        </span>
      </div>

      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task)}>
          <Pencil size={14} />
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;