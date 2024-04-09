import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

// Component for displaying a job card
function Job({ id, title, salary, equity, companyName }) {
    const { user, applyToJob, appliedJobs } = useContext(UserContext); // Get user context and functions from UserContext
    const navigate = useNavigate(); // Hook for navigating programmatically

    // Get an array of IDs of jobs user has applied to
    const appliedJobIds = appliedJobs.map((job) => job.id);

    // Check if user has applied to the job
    const userApplied = appliedJobIds.includes(id);

    // Function to handle job application
    const handleApply = async (id) => {
        try {
            await applyToJob(user.username, id); // Call applyToJob function with user's username and job ID
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    // Function to handle edit click
    const handleEditClick = () => {
        try {
            navigate(`/jobs/${id}/edit`); // Navigate to edit job page
        } catch (error) {
            console.error('Error navigating to edit page:', error);
        }
    };

    return (
        <div className="card-container">
            <div className="card-content">
                <div className="card-title">{title}</div>
                <div className="card-salary">Salary: {salary}</div>
                <div className="card-equity">Equity: {!equity ? '0' : equity}</div>
                {companyName && <div className="card-companyName">Company Name: {companyName}</div>}
            </div>
            <div className="card-buttons">
                {!user.isAdmin ? (
                    userApplied ? (
                        <button className="card-applied-button" disabled>
                            Applied
                        </button>
                    ) : (
                        <button className="card-apply-button" onClick={() => handleApply(id)}>
                            Apply
                        </button>
                    )
                ) : (
                    <button className="card-edit-button" onClick={handleEditClick}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default Job;
