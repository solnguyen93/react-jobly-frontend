import React, { useContext } from 'react';
import useFields from '../hooks/useFields';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

// Component for adding a new job
const NewJobForm = () => {
    const { createJob } = useContext(UserContext); // Get createJob function from UserContext
    const navigate = useNavigate(); // Hook for navigating programmatically

    // Initial state for form fields
    const INITIAL_STATE = {
        title: '',
        salary: '',
        equity: '',
        companyHandle: '',
        companyName: '',
    };

    // Use custom hook for managing form fields
    const [formData, handleChange, resetForm, error] = useFields(INITIAL_STATE);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        try {
            e.preventDefault(); // Prevent default form submission
            const { companyName, ...formDataExcludeCompanyName } = formData; // Exclude companyName from formData
            await createJob({ ...formDataExcludeCompanyName }); // Call createJob function with form data
            navigate(`/jobs`); // Navigate to jobs page after successful job creation
            resetForm(); // Reset form fields
        } catch (error) {
            console.error('Error handling form submission:', error);
        }
    };

    // Function to handle company name change
    const handleCompanyNameChange = (e) => {
        const companyName = e.target.value; // Get company name from input
        const companyHandle = companyName // Generate company handle based on company name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-and-/g, '-');
        handleChange({ target: { name: 'companyHandle', value: companyHandle } }); // Update companyHandle field in form data
        handleChange(e); // Call handleChange to update companyName field
    };

    return (
        <form onSubmit={handleSubmit} className="add-job-form">
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there is any */}
            <label htmlFor="title">Title</label>
            <input id="title" type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
            <label htmlFor="salary">Salary</label>
            <input id="salary" type="number" placeholder="Salary" name="salary" value={formData.salary} onChange={handleChange} step={1000} />
            <label htmlFor="equity">Equity</label>
            <input id="equity" type="number" placeholder="Equity" name="equity" value={formData.equity} onChange={handleChange} step={0.001} />
            <label htmlFor="companyName">Company Name</label>
            <input
                id="companyName"
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleCompanyNameChange}
            />
            <label htmlFor="companyHandle">Company Handle (Read-only)</label>
            <input id="companyHandle" type="text" placeholder="Company Handle" name="company.handle" value={formData.companyHandle} readOnly />
            <button>Add</button>
        </form>
    );
};

export default NewJobForm;
