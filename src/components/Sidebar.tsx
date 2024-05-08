import React from 'react';
import { FaTasks, FaCalendarAlt, FaCheckCircle, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import '../styles/components/sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/all-tasks"><FaTasks /><span>All Tasks</span></Link></li>
                <li><Link to="/todays-tasks"><FaCalendarAlt /><span>Today's Tasks</span></Link></li>
                <li><Link to="/completed-tasks"><FaCheckCircle /><span>Completed Tasks</span></Link></li>
                <li><Link to="/new-task"><FaPlus /><span>New Task</span></Link></li>
            </ul>
            <div className="logout-btn">
                <FaSignOutAlt />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;

