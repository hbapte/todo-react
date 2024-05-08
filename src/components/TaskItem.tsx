import React, { useState } from 'react';
import '../styles/components/taskItem.css';

interface TaskItemProps {
  task: { _id: string; name: string; completed: boolean };
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string, completed: boolean) => void;
  onUpdateTaskName: (taskId: string, newName: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onCompleteTask, onUpdateTaskName }) => {
  const { _id, name, completed } = task;
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleDelete = () => {
    onDeleteTask(_id);
  };

  const handleCompleteClick = () => {
    const newCompletedState = !completed;
    onCompleteTask(_id, newCompletedState);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdateTaskName(_id, newName);
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      {!editing ? (
        <>
          <span className="task-name">{name}</span>
          <button className="complete-button" onClick={handleCompleteClick}>
            {completed ? 'Incomplete' : 'Complete'}
          </button>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <input type="text" value={newName} onChange={handleChange} />
          <button className="save-button" onClick={handleSave}>Save</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
