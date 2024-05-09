import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages/requestEmailToken.css';

interface FormData {
  email: string;
}

const RequestVerificationLinkForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/request-new-verification-link', data);
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      toast.error(error);
    }
  }, []);

  return (
    <>
      <div className="form-container">
        <h2>Request New Verification Link</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            {...register('email', { required: 'Email is required' })}
            className={`input-field ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          <button type="submit" className="submit-button">Request</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RequestVerificationLinkForm;
