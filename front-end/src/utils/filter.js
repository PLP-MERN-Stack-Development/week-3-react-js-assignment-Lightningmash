// src/utils/filter.js
const filterTasks = (tasks, filter) => {
  switch (filter) {
    case "all":
      return tasks;
    case "active":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export default filterTasks;
