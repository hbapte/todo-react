import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/pages/dashboardd.css';
import AllTasks from '../pages/AllTasks';
import TodaysTasks from '../pages/TodaysTasks';
import CompletedTasks from '../pages/CompletedTasks';
import NewTask from '../pages/NewTask';

const Dashboard: React.FC = () => {
    return (
    
            <div className="dashboard">
                <Header />
                <Sidebar />
   
                <Route path="/all-tasks" element={<AllTasks />} />
                <Route path="/todays-tasks" element={<TodaysTasks />} />
                <Route path="/completed-tasks" element={<CompletedTasks />} />
                <Route path="/new-task" element={<NewTask />} />
            </div>

    );
};

export default Dashboard;
