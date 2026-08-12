import CompletionChart from "./components/CompletionChart";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import toast, { Toaster } from "react-hot-toast";

import {
  LayoutDashboard,
  ListTodo,
  Activity,
  Settings,
  Plus,
  Search,
} from "lucide-react";

import StatsCard from "./components/StatsCard";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import ActivityView from "./components/ActivityView";
import TasksView from "./components/TasksView";
import SettingsView from "./components/SettingsView";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getActivities,
  createActivity,
} from "./services/taskService";

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [activePage, setActivePage] = useState("dashboard");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [activities, setActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("taskflow-theme") === "dark";
});
  useEffect(() => {
  document.body.classList.toggle("dark-mode", darkMode);

  localStorage.setItem(
    "taskflow-theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);
  useEffect(() => {
  loadTasks();
  loadActivities();
}, []);

  async function loadTasks() {
    try {
      setIsLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }
  async function loadActivities() {
  try {
    const data = await getActivities();
    setActivities(data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load activity");
  }
}

  async function addActivity(type, message) {
  try {
    const activity = await createActivity({
      type,
      message,
    });

    setActivities((current) => [
      activity,
      ...current,
    ].slice(0, 30));
  } catch (error) {
    console.error("Failed to save activity:", error);
  }
}

  async function handleSave(taskData) {
    try {
      if (editingTask) {
        await updateTask({
          ...taskData,
          id: editingTask.id,
        });

        toast.success("Task updated successfully");

        if (
          editingTask.status !== "Completed" &&
          taskData.status === "Completed"
        ) {
          addActivity(
            "completed",
            `"${taskData.title}" was marked as completed`
          );
        } else {
          addActivity(
            "updated",
            `"${taskData.title}" was updated`
          );
        }
      } else {
        const createdTask = await createTask(taskData);

        toast.success("Task created successfully");

        addActivity(
          "created",
          `"${createdTask.title}" was created`
        );
      }

      setShowForm(false);
      setEditingTask(null);

      await loadTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  async function handleDelete(id) {
    const task = tasks.find((item) => item.id === id);

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);

      toast.success("Task deleted successfully");

      if (task) {
        addActivity(
          "deleted",
          `"${task.title}" was deleted`
        );
      }

      await loadTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleCreate() {
    setEditingTask(null);
    setShowForm(true);
  }

  function isOverdue(task) {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    return new Date(task.dueDate) < new Date();
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        title.includes(search) ||
        description.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    searchTerm,
    statusFilter,
    priorityFilter,
  ]);

  const stats = useMemo(() => {
    const total = tasks.length;

    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const overdue = tasks.filter(
      (task) => isOverdue(task)
    ).length;

    return {
      total,
      pending,
      inProgress,
      completed,
      overdue,
    };
  }, [tasks]);

  function renderDashboard() {
    return (
      <>
        <header className="topbar">
          <div>
            <p className="eyebrow">TASK MANAGEMENT</p>

            <h1>Good to see you 👋</h1>

            <p className="header-copy">
              Stay focused, organize your priorities,
              and keep things moving.
            </p>
          </div>

          <button
            className="add-task-btn"
            onClick={handleCreate}
          >
            <Plus size={17} />
            Add Task
          </button>
        </header>

        <section className="stats-grid">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            subtitle="All active records"
          />
          <CompletionChart
  completed={stats.completed}
  total={stats.total}
/>

          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            subtitle="Currently being worked on"
          />

          <StatsCard
            title="Completed"
            value={stats.completed}
            subtitle="Successfully finished"
          />

          <StatsCard
            title="Overdue"
            value={stats.overdue}
            subtitle="Needs immediate attention"
          />
        </section>

        <section className="workspace">
          <div className="workspace-header">
            <div>
              <p className="eyebrow">WORKSPACE</p>

              <h2>Your Tasks</h2>

              <p>
                {filteredTasks.length} task
                {filteredTasks.length !== 1 ? "s" : ""} visible
              </p>
            </div>

            <div className="filter-row">
              <div className="search-wrapper">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>

              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="All">
                  All Priorities
                </option>
                <option value="Low">Low</option>
                <option value="Medium">
                  Medium
                </option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="empty-state">
              <div className="loader" />
              <h3>Loading tasks...</h3>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>

              <h3>No tasks found</h3>

              <p>
                Create a task or adjust your filters.
              </p>

              <button
                className="primary-btn"
                onClick={handleCreate}
              >
                Create your first task
              </button>
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <div className="app-shell">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            padding: "12px 16px",
          },
        }}
      />

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>

          <div>
            <h2>TaskFlow</h2>
            <span>Productivity Hub</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${
              activePage === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("dashboard")
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={`nav-item ${
              activePage === "tasks"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("tasks")
            }
          >
            <ListTodo size={18} />
            My Tasks
          </button>

          <button
            className={`nav-item ${
              activePage === "activity"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("activity")
            }
          >
            <Activity size={18} />
            Activity
          </button>

          <button
            className={`nav-item ${
              activePage === "settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("settings")
            }
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="productivity-card">
            <p className="small-label">
              PRODUCTIVITY
            </p>

            <h3>
              {stats.completed}/{stats.total}
            </h3>

            <p>Tasks completed</p>

            <div className="progress-track">
              <div
                className="progress-value"
                style={{
                  width:
                    stats.total === 0
                      ? "0%"
                      : `${
                          (stats.completed /
                            stats.total) *
                          100
                        }%`,
                }}
              />
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {activePage === "dashboard" &&
          renderDashboard()}

        {activePage === "tasks" && (
          <TasksView
            tasks={filteredTasks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {activePage === "activity" && (
          <ActivityView activities={activities} />
        )}

        {activePage === "settings" && (
          <SettingsView
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
        )}

        <footer className="footer">
          <span>TaskFlow</span>

          <p>
            React + ASP.NET Core + Entity Framework Core
            + SQLite
          </p>
        </footer>
      </main>

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;