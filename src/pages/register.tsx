import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages/register.css';

const RegisterForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Add setError from react-hook-form
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage] = useState('');
  

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('https://todo-express-server-0yda.onrender.com/api/auth/register', data);
            console.log(response.data); 
            toast.success('Registration successful, Please verify email to login!');
        } catch (error) {
            console.error('Error registering user:', error);
            if ((error as any).response && (error as any).response.data && (error as any).response.data.error) {
                toast.error((error as any).response.data.error);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
        <main id="signup-form">
            <form id="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
                <div id="signup-headers">
                    <h2 className="signup-form-title">Sign up</h2>
                    <p className="login-account">
                        Already have an account? <a href="/login">Login Now</a>
                    </p>
                </div>

                <fieldset>
                    <div className="signup-inputs">
                        <label htmlFor="names" className="signup-label">Names:</label>
                        <input type="text" {...register('names', { required: true, minLength: 5 })} />
                        {errors.names && errors.names.type === 'required' && <div className="error-message">Names are required</div>}
                        {errors.names && errors.names.type === 'minLength' && <div className="error-message">Names should be at least 5 characters long</div>}

                        <label htmlFor="email" className="signup-label">Email:</label>
                        <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                        {errors.email && errors.email.type === 'required' && <div className="error-message">Email is required</div>}
                        {errors.email && errors.email.type === 'pattern' && <div className="error-message">Invalid email</div>}

                        <label htmlFor="username" className="signup-label">Username:</label>
                        <input type="text" {...register('username', { required: true, minLength: 3 })} />
                        {errors.username && errors.username.type === 'required' && <div className="error-message">Username is required</div>}
                        {errors.username && errors.username.type === 'minLength' && <div className="error-message">Username should be at least 3 characters long</div>}

                        <label htmlFor="password" className="signup-label">
                            Password:
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: true, minLength: 6 })}
                                />
                                {showPassword ? (
                                    <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </label>
                        {errors.password && errors.password.type === 'required' && <div className="error-message">Password is required</div>}
                        {errors.password && errors.password.type === 'minLength' && <div className="error-message">Password should be at least 6 characters long</div>}

                        <label htmlFor="confirm-password" className="signup-label">
                            Confirm Password:
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword', { required: true, minLength: 6 })}
                                />
                                {showConfirmPassword ? (
                                    <FaEyeSlash className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility} />
                                ) : (
                                    <FaEye className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility} />
                                )}
                            </div>
                        </label>
                        {errors.confirmPassword && errors.confirmPassword.type === 'required' && <div className="error-message">Match Password is required</div>}
                        {errors.confirmPassword && errors.confirmPassword.type === 'minLength' && <div className="error-message">Passwords do not match</div>}

                        <div id="check">
                            <div className="signup-check">
                                <input type="checkbox" {...register('agree')} id="agree" />
                                <label htmlFor="agree">Agree to <a href="/" className="terms">Terms & Conditions</a></label>
                            </div>
                            <div className="signup-check" id="newsletter">
                                <input type="checkbox" name="newsletter" id="newsletter" />
                                <label htmlFor="newsletter">Subscribe</label>
                            </div>
                        </div>

                        <button type="submit" className="signup-btn">Sign up</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div id="SignupSent"></div>
                    </div>
                </fieldset>
            </form>
        </main>
        <ToastContainer />
        </>
    );
};

export default RegisterForm;
