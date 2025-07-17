import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import useLocalStorage from '../hooks/useLocalStorage';
import filterTasks from '../utils/filter';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = filterTasks(tasks, filter);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

      {/* Task Input */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {/* Task List as Cards */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No tasks found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="flex flex-col gap-2 p-4">
              <div className="flex items-start justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span
                    className={`${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </label>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>{tasks.filter((task) => !task.completed).length} tasks remaining</p>
      </div>
    </div>
  );
};

export default TaskManager;
