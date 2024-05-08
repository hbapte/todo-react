import React, { useState } from 'react';
import '../styles/pages/HomePage.css';
import TodoList from './TodoList';
import avatarImage from '../assets/images/avatar.svg'; // Import your avatar image here

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={avatarImage} alt="Avatar" className="avatar" />
          <h2>User</h2>
        </div>
        <h2>Tasks</h2>
        <ul>
          <li>Today Tasks</li>
          <li>All Tasks</li>
          <li>Important Tasks</li>
          <li>Completed Tasks</li>
          <li>Uncompleted Tasks</li>
        </ul>
        <div className="completed-tasks">
          <h2>Completed Tasks</h2>
          <div className="completed-task-range">
            <div className="completed-task-range-filled" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="button">Logout</button>
        </div>
      </div>
      <div className="content">
        <h1> To-Do List App</h1>
        <div>
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button className="button" onClick={handleAddTodo}>Add Todo </button>
        </div>
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default HomePage;
