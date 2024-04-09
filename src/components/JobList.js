import React, { useContext } from 'react';
import Job from './Job.js';
import { Link } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
import JoblyApi from '../api';
import UserContext from '../context/UserContext';

// Component for displaying a list of jobs
function JobList({ list, title = 'Job List' }) {
    // Fetch data for jobs using custom hook useDataFetching
    const { data: jobs, loading } = useDataFetching(list ? () => Promise.resolve(list) : JoblyApi.getAllJobs.bind(JoblyApi));
    const { user } = useContext(UserContext); // Get user context

    // Render loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render job list
    return (
        <div className="JobList">
            <h3>{title}</h3>

            {user.isAdmin && (
                <Link to="/jobs/new" className="AddNewJobLink">
                    Add New Job
                </Link>
            )}
            <div className="JobList-Jobs">
                {jobs.map(({ id, title, salary, equity, companyHandle, companyName }) => (
                    <Job key={id} id={id} title={title} salary={salary} equity={equity} companyHandle={companyHandle} companyName={companyName} />
                ))}
            </div>
        </div>
    );
}

export default JobList;
