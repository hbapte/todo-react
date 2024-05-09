import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/pages/auth/resetPassword.css'; 

interface FormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        toast.error('Invalid reset password token');
        return;
      }
      await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/reset-password', { token, newPassword: data.password });
      toast.success('Password reset successfully');
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password" className="signup-label">
            New Password:
            <div className="password-input">
              <input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password should be at least 6 characters long' } })}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {passwordShown ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </label>
          {errors.password && <div className="error-message">{errors.password.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="signup-label">
            Confirm Password:
            <div className="password-input">
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword', { required: 'Confirm Password is required', minLength: { value: 6, message: 'Passwords do not match' } })}
              />
              <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordShown ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </label>
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword.message}</div>}
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordForm;
