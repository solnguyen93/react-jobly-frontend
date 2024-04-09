import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import JobList from './JobList.js';

// Component for displaying user profile
function Profile() {
    const navigate = useNavigate(); // Hook for navigating programmatically
    const { user, appliedJobs } = useContext(UserContext); // Get user context
    const { username, firstName, lastName, email, isAdmin } = user; // Destructure user object

    // Function to handle edit profile click
    const handleEditClick = () => {
        try {
            navigate(`/profile/${username}`); // Navigate to edit profile page
        } catch (error) {
            console.error('Error navigating to edit page:', error);
        }
    };

    return (
        <div>
            <h3>User Profile</h3>
            <div className="card-container">
                <div className="card-content">
                    <div className="card-username">Username: {username}</div>
                    <div className="card-firstName">First Name: {firstName}</div>
                    <div className="card-lastName">Last Name: {lastName}</div>
                    <div className="card-email">Email: {email}</div>
                    <div className="card-email">Admin: {isAdmin ? 'yes' : 'no'}</div>
                </div>
                <div className="card-buttons">
                    <button className="card-edit-button" onClick={handleEditClick}>
                        Edit
                    </button>
                </div>
            </div>

            {!user.isAdmin && <JobList title={'Job Applications'} list={appliedJobs} />}
        </div>
    );
}

export default Profile;
