import React from 'react';
import '../styles/components/header.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="header">
            <div>
                <p>To Do app</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Header;
