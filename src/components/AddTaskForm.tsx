// AddTaskForm.tsx
import React, { useState } from 'react';
import '../styles/components/addTaskForm.css';

interface AddTaskFormProps {
  onAdd: (text: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add new task..."
        className="add-task-input"
      />
      <button type="submit" className="add-task-button">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
