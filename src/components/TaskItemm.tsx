import React from 'react';
import './styles/taskItem.css';

interface TaskItemProps {
    task: string;
    completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, completed }) => {
    return (
        <div className={`task-item ${completed ? 'completed' : ''}`}>
            <span>{task}</span>
        </div>
    );
};

export default TaskItem;
