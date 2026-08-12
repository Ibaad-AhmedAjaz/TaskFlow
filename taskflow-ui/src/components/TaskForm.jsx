import { useEffect, useState } from "react";

const emptyTask = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

function TaskForm({ editingTask, onSave, onClose }) {
  const [formData, setFormData] = useState(emptyTask);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        ...editingTask,
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.substring(0, 10)
          : "",
      });
    } else {
      setFormData(emptyTask);
    }
  }, [editingTask]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    const taskToSave = {
      ...formData,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : new Date().toISOString(),
    };

    onSave(taskToSave);
  }

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <div className="modal-header">
          <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What needs to be done?"
          />

          <div className="form-row">
            <div>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-btn">
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;