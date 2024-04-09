import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import useFields from '../hooks/useFields';

const SignUpForm = () => {
    // Access the signup function from the UserContext
    const { signup } = useContext(UserContext);

    // Initial form state
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    // Destructure the form data, handleChange function, and resetForm function from the custom hook
    const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);

    // Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Call the signup function with the form data
            await signup(formData);
            // Reset the form fields after submission
            resetForm();
        } catch (error) {
            console.error('Error signing up', error);
        }
    };

    return (
        <form onSubmit={handleSignup} className="signup-user-form">
            <h1>Sign Up Page</h1>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
