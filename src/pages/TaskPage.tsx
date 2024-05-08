import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import Headers from '../components/Header';
import '../styles/pages/HomePage.css';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://todo-express-server-0yda.onrender.com/api/tasks');
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
    }
  };

  const handleAddTask = async (text: string) => {
    try {
      const response = await axios.post('https://todo-express-server-0yda.onrender.com/api/tasks', { taskName: text });
      setTasks([...tasks, response.data]);
      setError('');
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task. Please try again later.');
    }
  };

  const handleCompleteTask = async (taskId: string, completed: boolean) => {
    try {
      await axios.put(`https://todo-express-server-0yda.onrender.com/api/tasks/${taskId}`, { completed: completed });
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, completed: completed };
        }
        return task;
      });
      setTasks(updatedTasks);
      setError('');
    } catch (error) {
      console.error('Error completing task:', error);
      setError('Failed to complete task. Please try again later.');
    }
  };
  
  

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`https://todo-express-server-0yda.onrender.com/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      setError('');
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again later.');
    }
  };


  const handleUpdateTaskName = async (taskId: string, newName: string) => {
    try {
      await axios.put(`https://todo-express-server-0yda.onrender.com/api/tasks/${taskId}`, { taskName: newName });
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, name: newName };
        }
        return task;
      });
      setTasks(updatedTasks);
      setError('');
    } catch (error) {
      console.error('Error updating task name:', error);
      setError('Failed to update task name. Please try again later.');
    }
  };
  
  

  return (
    <>
    <Headers />
    <div className="home-page">

      {error && <p className="error-message">{error}</p>}
      <AddTaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onCompleteTask={(taskId: string, completed: boolean) => handleCompleteTask(taskId, completed)} onDeleteTask={handleDeleteTask} onUpdateTaskName={handleUpdateTaskName} />

    </div>
    </>
  );
};

export default HomePage;
