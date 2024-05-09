// ResetPasswordForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) {
            toast.error('Invalid reset password token');
            return;
        }
        await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/reset-password', { token, newPassword: password });
        toast.success('Password reset successfully');
    } catch (error: any) {
        if (error.response) {
            const responseError = (error.response.data.error);
            toast.error(responseError);
        } else {
            toast.error('An error occurred. Please try again later.');
        }
    }
  };

  return (
    <>
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
    <ToastContainer />
    </>
  );
};

export default ResetPasswordForm;
