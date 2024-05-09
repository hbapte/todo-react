import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/pages/auth/forgotPassword.css';
import { useLocation } from 'react-router-dom';

interface FormData {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const location = useLocation();


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get('error');
    if (error) {
      toast.error(error);
    }
  }, [location]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/forgot-password', data);
      toast.success('Reset password link sent successfully');
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && <div className="error-message">{errors.email.message}</div>}
          </div>

          <button type="submit">Reset Password</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordForm;
