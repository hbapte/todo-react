// ForgotPasswordForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/forgot-password', { email });
      toast.success('Reset password link sent successfully');
    } catch (error:any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
