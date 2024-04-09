import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
import JoblyApi from '../api';
import UserContext from '../context/UserContext';

// Component for editing a job
function EditJobForm() {
    const navigate = useNavigate(); // Hook for navigating programmatically
    const { id: jobId } = useParams(); // Get job ID from URL parameters
    const { data: jobData, setData: setJobData, loading } = useDataFetching(JoblyApi.getJob.bind(JoblyApi), jobId); // Fetch job data
    const { updateJob, deleteJob } = useContext(UserContext); // Get updateJob and deleteJob functions from UserContext
    const [error, setError] = useState(''); // State for error message

    // Function to handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Get name and value of the field that triggered the change
        let newValue = value; // Initialize newValue variable

        if (name === 'salary') {
            // If the field is 'salary', parse the value as an integer
            const intValue = parseInt(value, 10);
            if (!isNaN(intValue)) {
                newValue = intValue;
            } else {
                newValue = '';
            }
        } else if (name === 'equity') {
            // If the field is 'equity', parse the value as a float and validate it
            const floatValue = parseFloat(value);
            if (isNaN(floatValue) || floatValue < 0 || floatValue >= 1) {
                newValue = '';
                setError('Equity must be greater than or equal to 0 but less than 1');
            } else {
                setError('');
            }
        }

        // Update job data with the new value
        setJobData((jobData) => ({
            ...jobData,
            [name]: newValue,
        }));
    };

    // Function to handle job update
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const formattedJobData = {
                title: jobData.title,
                salary: jobData.salary,
                equity: jobData.equity,
            };
            await updateJob(jobId, formattedJobData); // Call updateJob function with formatted job data
            navigate(`/jobs`); // Navigate to jobs page after successful job update
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    // Function to handle job deletion
    const handleDelete = async () => {
        try {
            await deleteJob(jobId); // Call deleteJob function with job ID
            navigate(`/jobs`); // Navigate to jobs page after successful job deletion
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="edit-job-form">
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there is any */}
            <label htmlFor="title">Title</label>
            <input id="title" type="text" placeholder="Title" name="title" value={jobData.title} onChange={handleChange} />
            <label htmlFor="salary">Salary</label>
            <input id="salary" type="number" placeholder="Salary" name="salary" value={jobData.salary} onChange={handleChange} step={1000} />
            <label htmlFor="equity">Equity</label>
            <input
                id="equity"
                type="number"
                placeholder="Equity"
                name="equity"
                value={!jobData.equity ? '0' : jobData.equity}
                onChange={handleChange}
            />
            <button type="submit" className="Job-update-button">
                Update
            </button>
            <button type="button" className="Job-delete-button" onClick={handleDelete}>
                Delete
            </button>
        </form>
    );
}

export default EditJobForm;
