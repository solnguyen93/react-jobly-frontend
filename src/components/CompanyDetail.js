import React from 'react';
import { useParams } from 'react-router-dom';
import Job from './Job.js';
import useDataFetching from '../hooks/useDataFetching';
import JoblyApi from '../api';

function CompanyDetail() {
    const { handle } = useParams(); // Getting company handle from URL params
    const { data: companyData, loading } = useDataFetching(JoblyApi.getCompany.bind(JoblyApi), handle); // Fetching company data using custom hook

    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    const { name, description, jobs } = companyData; // Destructuring company data

    return (
        <div className="company-detail-container">
            <div className="company-detail-content">
                <div className="company-detail-name">{name}</div>
                <div className="company-detail-description">{description}</div>
            </div>
            <div className="company-detail-jobs">
                {jobs.map(({ id, title, salary, equity }) => (
                    <Job key={id} id={id} title={title} salary={salary} equity={equity} />
                ))}
            </div>
        </div>
    );
}

export default CompanyDetail;
