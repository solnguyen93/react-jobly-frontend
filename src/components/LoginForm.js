import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import useFields from '../hooks/useFields';

const LoginForm = () => {
    // Accessing login function from UserContext
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    // Initial state for form fields
    const INITIAL_STATE = {
        username: '',
        password: '',
    };

    // Custom hook to manage form fields
    const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call the login function from UserContext to authenticate the user
            await login(formData);
            // Reset the form fields after successful login
            resetForm();
            // Navigate to the home page after successful login
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-user-form">
            <h1>Login Page</h1>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
