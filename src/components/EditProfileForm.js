import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFields from '../hooks/useFields';
import UserContext from '../context/UserContext';

// Component for editing user profile
function EditProfileForm() {
    const { username } = useParams(); // Get username from URL parameters
    const { user, updateUser, deleteUser, logout } = useContext(UserContext); // Get user context
    const navigate = useNavigate(); // Hook for navigating programmatically

    const [formData, handleChange, resetForm] = useFields(user); // Hook for handling form fields

    useEffect(() => {
        // Redirect to login if user is not authenticated
        if (!user) {
            navigate('/login');
        } else if (!user.isAdmin && user.username !== username) {
            navigate('/');
        }
    }, []);

    // Function to handle user update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            };

            await updateUser(username, updateData); // Update user data
            console.log('User data updated successfully');
            resetForm(); // Reset form fields
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // Function to handle user deletion
    const handleDelete = async () => {
        try {
            await deleteUser(username); // Delete user
            console.log('User deleted successfully');
            resetForm(); // Reset form fields
            logout(); // Log out user
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="edit-user-form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} disabled />
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} minLength="6" />
            <button type="submit" className="user-update-button">
                Update
            </button>
            <button type="button" className="user-delete-button" onClick={handleDelete}>
                Delete
            </button>
        </form>
    );
}

export default EditProfileForm;
