// TaskList.tsx
import React from 'react';
import TaskItem from './TaskItem';
import '../styles/components/taskList.css';

interface TaskListProps {
  tasks: any[]; 
  onCompleteTask: (taskId: string, completed: boolean) => Promise<void>; // Expecting two arguments
  onDeleteTask: (taskId: string) => Promise<void>;
  onUpdateTaskName: (taskId: string, newName: string) => void; // Add onUpdateTaskName prop
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask, onUpdateTaskName }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onCompleteTask={onCompleteTask} 
          onDeleteTask={onDeleteTask} 
          onUpdateTaskName={onUpdateTaskName} 
        />
      ))}
    </ul>
  );
};

export default TaskList;
