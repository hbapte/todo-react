import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/TaskPage';
import NotFound from './pages/notFound';
import RegisterForm from './pages/register';
import LoginForm from './pages/login';
import './styles/global.css';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    return <>{element}</>;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
