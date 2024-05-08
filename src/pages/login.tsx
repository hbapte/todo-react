import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/pages/login.css'; 
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/login', data);
            const { message, user, token } = response.data;
            console.log(message); 
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error('Error logging in user:', error);
            if ((error as any).response && (error as any).response.data) {
                const { error: backendError } = (error as any).response.data;
                setErrorMessage(backendError); 
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main id="login-form">
            <form id="LoginForm" onSubmit={handleSubmit(onSubmit)}>
                <div id="login-headers">
                    <h2 className="login-form-title">Sign In</h2>
                    <p className="login-account">
                        Not Registered yet? <a href="/signup">Create an account</a>
                    </p>
                </div>

                <fieldset>
                    <div className="login-inputs">
                        <label htmlFor="email" className="login-label">Email:</label>
                        <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                        {errors.email && errors.email.type === 'required' && <div className="error-message">Email is required</div>}
                        {errors.email && errors.email.type === 'pattern' && <div className="error-message">Invalid email</div>}


                        <div className="forgot-linkk">
                            <label htmlFor="password" className="login-label">Password:</label>
                            <a href="./forgot-pswd.html" className="forgot-link">Forgot Password?</a>

                        </div>

                        <input type={showPassword ? 'text' : 'password'} {...register('password', { required: true, minLength: 6 })} />
                        {errors.password && errors.password.type === 'required' && <div className="error-message">Password is required</div>}
                        {errors.password && errors.password.type === 'minLength' && <div className="error-message">Password should be at least 6 characters long</div>}

                        <div id="check">
                            <div className="login-check">
                                <input type="checkbox" {...register('RememberMe')} id="RememberMe" />
                                <label htmlFor="RememberMe">Remember Me</label>
                            </div>
                            <div className="login-check" id="psw-visibility">
                                <input type="checkbox" name="togglePasswordVisibility" id="togglePasswordVisibility" onChange={togglePasswordVisibility} />
                                <label htmlFor="togglePasswordVisibility">Show Password</label>
                            </div>
                        </div>

                        <button type="submit" className="login-btn">Sign In</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div id="LoginSent"></div>
                    </div>
                </fieldset>
            </form>
        </main>
    );
};

export default LoginForm;
