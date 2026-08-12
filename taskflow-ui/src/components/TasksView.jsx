import TaskCard from "./TaskCard";

function TasksView({
  tasks,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <section className="page-panel">
      <div className="tasks-page-header">
        <div>
          <p className="eyebrow">TASK WORKSPACE</p>
          <h2>My Tasks</h2>
          <p>Manage and organize your current work.</p>
        </div>

        <button className="add-task-btn" onClick={onCreate}>
          <span>＋</span>
          Add Task
        </button>
      </div>

      <div className="filter-row full-filter-row">
        <div className="search-wrapper">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="task-count-strip">
        <span>{tasks.length}</span>
        task{tasks.length !== 1 ? "s" : ""} matching current filters
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          <h3>No tasks found</h3>
          <p>Try adjusting the filters or create a new task.</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TasksView;