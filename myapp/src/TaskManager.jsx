import { useState } from "react";
import "./TaskManager.css";

function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: task,
        completed: false
      }
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const editTask = (id) => {
    const newTitle = prompt("Edit task:");

    if (newTitle && newTitle.trim()) {
      setTasks(
        tasks.map((item) =>
          item.id === id
            ? { ...item, title: newTitle }
            : item
        )
      );
    }
  };

  const logout = () => {
    window.location.reload();
  };

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <div className="task-page">

      {/* HEADER */}
      <header className="task-header">
        <div>
          <h1>GENLAB</h1>
          <p>Task Manager</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* MAIN */}
      <main className="task-container">

        {/* WELCOME */}
        <div className="welcome">
          <h2>Welcome to Task Manager 👋</h2>
          <p>Manage your daily tasks easily.</p>
        </div>

        {/* STATISTICS */}
        <div className="stats">

          <div className="stat-card">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>

        </div>

        {/* ADD TASK */}
        <div className="add-task">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            + Add Task
          </button>

        </div>

        {/* TASK LIST */}
        <div className="task-list">

          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <p className="no-task">
              No tasks yet. Add your first task!
            </p>
          ) : (
            tasks.map((item) => (
              <div
                className={`task-item ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >

                <div className="task-left">

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />

                  <span>{item.title}</span>

                </div>

                <div className="task-actions">

                  <button
                    className="edit-btn"
                    onClick={() => editTask(item.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  );
}

export default TaskManager;