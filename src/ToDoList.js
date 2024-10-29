// src/ToDoList.js
import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [groups, setGroups] = useState([]);
  const [inputGroup, setInputGroup] = useState('');
  const [taskInputs, setTaskInputs] = useState({});

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('todoGroups')) || [];
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoGroups', JSON.stringify(groups));
  }, [groups]);

  const handleAddGroup = () => {
    if (inputGroup.trim()) {
      const newGroup = {
        name: inputGroup,
        tasks: [],
      };
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      setInputGroup('');
    }
  };

  const handleAddTask = (groupIndex) => {
    const inputTask = taskInputs[groupIndex] || '';
    if (inputTask.trim()) {
      const newTask = {
        text: inputTask,
        completed: false,
      };
      const updatedGroups = groups.map((group, index) =>
        index === groupIndex
          ? { ...group, tasks: [...group.tasks, newTask] }
          : group
      );
      setGroups(updatedGroups);
      setTaskInputs({ ...taskInputs, [groupIndex]: '' });
    }
  };

  const handleTaskInputChange = (groupIndex, value) => {
    setTaskInputs({ ...taskInputs, [groupIndex]: value });
  };

  const toggleTaskCompletion = (groupIndex, taskIndex) => {
    const updatedGroups = groups.map((group, i) =>
      i === groupIndex
        ? {
            ...group,
            tasks: group.tasks.map((task, j) =>
              j === taskIndex ? { ...task, completed: !task.completed } : task
            ),
          }
        : group
    );
    setGroups(updatedGroups);
  };

  const handleDeleteTask = (groupIndex, taskIndex) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      const updatedGroups = groups.map((group, i) => {
        if (i === groupIndex) {
          return {
            ...group,
            tasks: group.tasks.filter((_, j) => j !== taskIndex),
          };
        }
        return group;
      });
      setGroups(updatedGroups);
    }
  };

  const handleDeleteGroup = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this group?");
    if (confirmed) {
      const updatedGroups = groups.filter((_, i) => i !== index);
      setGroups(updatedGroups);
    }
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>

      <div className="input-container">
        <input
          type="text"
          value={inputGroup}
          onChange={(e) => setInputGroup(e.target.value)}
          placeholder="Add a new group..."
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>

      <div className="group-list">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="group">
            <h3>
              {group.name}
              <button className="delete-btn" onClick={() => handleDeleteGroup(groupIndex)}>×</button>
            </h3>
            <div>
              <input
                type="text"
                value={taskInputs[groupIndex] || ''}
                onChange={(e) => handleTaskInputChange(groupIndex, e.target.value)}
                placeholder="Add a new task..."
              />
              <button onClick={() => handleAddTask(groupIndex)}>Add Task</button>
            </div>
            <div className="task-list">
              {group.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className={`task ${task.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(groupIndex, taskIndex)}
                  />
                  <span>{task.text}</span>
                  <button onClick={() => handleDeleteTask(groupIndex, taskIndex)} className="delete-btn">×</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;